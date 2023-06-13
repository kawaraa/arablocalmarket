"use strict"; /** contact controller */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::contact.contact", ({ strapi }) => ({
  async create(ctx) {
    const customerId = await strapi.service("api::customer.customer").getCustomerId(ctx.state.user.id);
    ctx.request.body.data.customer = customerId;
    delete ctx.request.body.data.status;
    return super.create(ctx);
  },
}));
