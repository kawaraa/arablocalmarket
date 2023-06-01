"use strict"; /** customer service */
const { createCoreService } = require("@strapi/strapi").factories;
const cusEty = "api::customer.customer";

module.exports = createCoreService(cusEty, ({ strapi }) => ({
  async getCustomerId(user) {
    return (await strapi.query(cusEty).findOne({ where: { user }, select: ["id"] }))?.id;
  },
}));
