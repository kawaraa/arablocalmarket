// https://docs.strapi.io/dev-docs/configurations/cron

module.exports = {
  /* second, minute, hour, day, month, weekdays > Simple example that runs Every sunday at 1 AM. */
  "0 0 1 * * 0": ({ strapi }) => {
    // Todo: Add your own logic here (e.g. send a queue of email, create a database backup, etc.)

    console.log("\nJob cron is running...\n");
  },
};
