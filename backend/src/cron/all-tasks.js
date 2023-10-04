// https://docs.strapi.io/dev-docs/configurations/cron
const affEty = "api::affiliate.affiliate";
const storeEty = "api::store.store";
const stripeEty = "api::stripe.stripe";
const invoiceEty = "api::invoice.invoice";
const bankEty = "api::bank.bank";
const day = 1000 * 60 * 60 * 24;

module.exports = {
  /* second, minute, hour, day, month, weekdays
  "0 0 1 * * 0" > Simple example that runs Every sunday at 1 AM. */
  "0 0 1 * * 0": async ({ strapi }) => {
    console.log("\nInvoices job cron is running...\n");
    createInvoices(strapi);
    deleteExpiredStores(strapi);
  },
  "0 0 2 * * *": async ({ strapi }) => {
    console.log("\nDatabase Job cron is running...\n");
    createDatabaseBackup();
  },
};

async function createDatabaseBackup() {
  try {
    const serviceAccount = JSON.parse(process.env.GCS_SERVICE_ACCOUNT);
    const { Storage } = require("@google-cloud/storage");

    await new Storage({
      projectId: serviceAccount.project_id,
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
    })
      .bucket(process.env.GCS_DATABASE_BACKUP)
      .upload(process.env.HOME + process.env.SQLITE_DATABASE_FILENAME, {
        destination: require("path").basename(process.env.SQLITE_DATABASE_FILENAME),
      });

    console.log("[###]-[Database Cron] Database backup has been created successfully");
  } catch (error) {
    console.warn("[XXX]-[Database Cron] Failed to create database backup", error);
  }
}

async function createInvoices(strapi) {
  const status = "PENDING";
  try {
    const affiliateOptions = { where: { active: true }, populate: { user: { select: ["id"] } } };
    const affiliates = await strapi.query(affEty).findMany(affiliateOptions);

    await Promise.all(affiliates.map(checkInvoice));

    async function checkInvoice({ user, referredItem, percentage, ...aff }) {
      try {
        const store = await strapi.service(storeEty).getStripeFields(referredItem);
        const bank = await strapi.query(bankEty).findOne({ where: { user: user.id }, select: ["id"] });
        const { latest_invoice } = await strapi.service(stripeEty).getSubscription(store.subscriptionId);
        const { paid, amount_paid, ...invoice } = await strapi.service(stripeEty).getInvoice(latest_invoice);

        if (!paid || invoice.status != "paid") return;

        const options = { where: { stripeInvoices: { $containsi: latest_invoice } } };
        const oldInvoice = await strapi.query(invoiceEty).findOne(options);
        if (oldInvoice) return;

        // Check for pending invoice to append the new invoice
        const vOp = { where: { user: user.id, status }, populate: { affiliates: { select: ["id"] } } };
        const { id, stripeInvoices, amount, affiliates } =
          (await strapi.query(invoiceEty).findOne(vOp)) || {};

        if (id) {
          await strapi.service(invoiceEty).update(id, {
            data: {
              affiliates: [...affiliates, { id: aff.id }],
              amount: (amount_paid / 100 / 100) * percentage + amount,
              bank: bank?.id || null,
              stripeInvoices: !stripeInvoices ? latest_invoice : `${stripeInvoices},${latest_invoice}`,
            },
          });
        } else {
          await strapi.service(invoiceEty).create({
            data: {
              user: user.id,
              affiliates: aff.id,
              amount: (amount_paid / 100 / 100) * percentage,
              bank: bank?.id || null,
              status: "PENDING",
              stripeInvoices: latest_invoice,
              amount: amount_paid,
            },
          });
        }
      } catch (error) {
        console.warn("[XXX]-[Invoices Task Error] ", error);
      }
    }

    console.log("[###]-[Invoices Cron] Invoices have been created successfully");
  } catch (error) {
    console.warn("[XXX]-[Invoices Cron] Failed to create invoices", error);
  }
}

async function deleteExpiredStores(strapi) {
  async function checkStore(store) {
    try {
      if (store.subscriptionId) {
        const sub = await strapi.service(stripeEty).getSubscription(store.subscriptionId);
        const endedAt = +(sub?.ended_at + "000");
        if (!Number.isNaN(endedAt) && endedAt + day * 30 > Date.now()) return;
      } else if ((Date.now() - Date.parse(store.createdAt)) / day < 30) {
        return; // if the store does not have store.subscriptionId and hasn't been 30 days created
      }

      return strapi.service(storeEty).deleteStoreAndItsProducts(store.id, store);
    } catch (error) {
      console.warn("[XXX]-[Store Task Error] ", error);
    }
  }

  try {
    const options = {
      select: ["id", "subscriptionId"],
      populate: ["cover"],
      where: { subscriptionStatus: { $notIn: ["active", "trialing"] } },
      offset: 0,
      limit: 200,
    };
    const stores = await strapi.query(storeEty).findMany(options);

    await Promise.all(stores.map(checkStore));

    if (stores[0]) return deleteStores(strapi);
    console.log("[###]-[Store Cron] Successfully deleted stores that been 30 days inactive");
  } catch (error) {
    console.warn("[XXX]-[Store Cron] Failed to delete stores that have been 30 inactive", error);
  }
}
