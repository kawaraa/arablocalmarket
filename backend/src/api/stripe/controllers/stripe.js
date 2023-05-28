"use strict"; /** A set of functions called "actions" for `stripe` */

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }

  async findOne(ctx) {
    const store = await strapi.service("api::store.store").findOne(ctx.query.storeId);
    const sub = await strapi.service("api::stripe.stripe").getSubscription(store?.subscriptionId);
    // const invoices = await strapi.service("api::stripe.stripe").getInvoicesBySub(sub?.id);
    // console.log(invoices);

    return {
      id: sub.plan.id, // priceId
      amount: sub.plan.amount,
      status: sub.status, // active, inactive, trialing
      start: sub.start_date,
      created: sub.created,
      ends: sub.ended_at, // ends on
      trialPeriod: sub.plan.trial_period_days, // Trial 30 days
      trialStart: sub.trial_start,
      trialEnd: sub.trial_end, // Trialing until
      currentPeriodStart: sub.current_period_start,
      currentPeriodEnd: sub.current_period_end,
      billingMethod: sub.collection_method, // "send_invoice", "charge_automatically"
      canceledAt: sub.canceled_at,
      paymentMethod: sub.default_payment_method, // // null, "card_1NC4fQHfSNaTv5C9kop9ixuW"
      invoices: [], // Todo: Invoices: amount, date
    };
  },
  async upgrade(ctx) {
    const store = await strapi.service("api::store.store").findOne(ctx.query.storeId);
    const currentSub = await strapi.service("api::stripe.stripe").getSubscription(store?.subscriptionId);

    const sub = await strapi.service("api::stripe.stripe").updateSubscription(currentSub.id, {
      cancel_at_period_end: false,
      proration_behavior: "create_prorations",
      items: [{ id: currentSub.items.data[0].id, price: ctx.query.priceId }],
    });

    return {
      id: sub.plan.id,
      amount: sub.plan.amount,
      status: sub.status,
      start: sub.start_date,
      created: sub.created,
      ends: sub.ended_at,
      trialPeriod: sub.plan.trial_period_days,
      trialStart: sub.trial_start,
      trialEnd: sub.trial_end,
      currentPeriodStart: sub.current_period_start,
      currentPeriodEnd: sub.current_period_end,
      billingMethod: sub.collection_method,
      canceledAt: sub.canceled_at,
      paymentMethod: sub.default_payment_method,
      invoices: [],
    };
  },
  async cancel(ctx) {
    const store = await strapi.service("api::store.store").findOne(ctx.query.storeId);
    await strapi.service("api::stripe.stripe").cancelSubscription(store.subscriptionId);
    return { success: true };
  },
  async create(ctx) {
    // ctx.state.user.stripeId
    // ctx.query.storeId
    // const store = await strapi.service("api::store.store").findOne(ctx.query.storeId);

    const { id, status } = await strapi
      .service("api::stripe.stripe")
      .createSubscription(c.id, priceId, storeId, "30");

    const userRes = await strapi
      .query("plugin::users-permissions.user")
      .update({ where: { id: userId }, data: { stripeId: c.id } });
    const storeRes = strapi
      .query("api::store.store")
      .update({ where: { id: res.data.id }, data: { subscriptionId: id, subscriptionStatus: status } });

    await createSubscription;
  },

  async webhook(ctx) {
    console.log("<<<<<<<< webhook >>>>>>>>>");

    const email = "alm@kawaraa.com";
    const name = "firstName lastName";
    const address = { line1: "dfw", postal_code: "23424", city: "A", country: "C" };

    // return strapi.service("api::stripe.stripe").createCustomer({ name, email, address });

    // return strapi.service("api::stripe.stripe").getCustomer("cus_Ny0GHwIesRGSTJ");
    // return strapi.service("api::stripe.stripe").getSubscription("sub_1NC5DFHfSNaTv5C9PDlMjoOK");

    // return strapi
    //   .service("api::stripe.stripe")
    //   .createSubscription("cus_Ny5mdKtuH7zJLv", "price_1NC4LfHfSNaTv5C9X2rCSDbN");
  },
};
