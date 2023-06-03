"use strict"; /** invoice controller */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::invoice.invoice", ({ strapi }) => ({
  async find() {},

  async findOne(ctx) {
    const earnings = { totalEarnings: 0, paid: 0, pending: 0, payable: 0 };
    const where = { user: { id: ctx.state.user.id } };
    // const populate = { affiliates: { populate: { price: true } } };
    const options = { select: ["id", "amount", "status"], where, offset: 0, limit: 120 };
    const invoices = await strapi.query("api::invoice.invoice").findMany(options);

    invoices.forEach((invoice) => {
      earnings.totalEarnings += invoice.amount;
      if (invoice.status == "PAID") earnings.paid += invoice.amount;
      else if (invoice.status == "PENDING") earnings.pending += invoice.amount;
      else if (invoice.status == "PAYABLE") earnings.payable += invoice.amount;
    });

    return earnings;
  },
}));
