// https://docs.strapi.io/dev-docs/configurations/cron

module.exports = {
  /* second, minute, hour, day, month, weekdays > Simple example that runs Every sunday at 1 AM. */
  "0 0 1 * * 0": ({ strapi }) => {
    // Todo:
    // Create a database backup
    // Create invoices with PENDING status for all the affiliates that
    // Do the formula before creating the invoice (affiliate.price / 100) * invoice.percentage

    // Delete the store that been 30 days inactive by checking Stripe subscription status last paid invoice
    // And delete it's linked affiliate
    // strapi.service("api::affiliate.affiliate").deleteByStore(id)

    console.log("\nJob cron is running...\n");
  },
};
