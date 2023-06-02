"use strict"; /** order service */
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::order.order", ({ strapi }) => ({
  normalizeCustomer(customer) {
    if (!customer || !customer.data?.attributes) return null;
    const { id, attributes } = customer.data;
    return { id, name: attributes.name };
  },

  async deleteOrdersByStore(storeId) {
    const orders = await strapi
      .query("api::order.order")
      .findMany({ select: ["id"], where: { store: { id: storeId } } });
    if (!orders[0]) return;

    await Promise.all(orders.map(({ id }) => strapi.query("api::order.order").delete({ where: { id } })));

    return this.deleteOrdersByStore(storeId);
  },
}));
