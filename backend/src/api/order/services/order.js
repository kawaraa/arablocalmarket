"use strict"; /** order service */
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::order.order", ({ strapi }) => ({
  normalizeCustomer(customer) {
    if (!customer || !customer.data?.attributes) return null;
    const { id, attributes } = customer.data;
    return { id, name: attributes.name };
  },
}));
