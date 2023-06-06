"use strict"; /** affiliate service */
const { createCoreService } = require("@strapi/strapi").factories;
const affEty = "api::affiliate.affiliate";

module.exports = createCoreService(affEty, ({ strapi }) => ({
  // Todo: Make sure the "price" is always in cent format
  syncActivity(referredItem, status, price) {
    const where = { referredItem };
    const data = { active: ["active", "trialing"].includes(status) };
    if (price >= 0) data.price = price / 100;

    return strapi.query(affEty).update({ where, data });
  },

  deleteByStore(storeId) {
    return strapi.query(affEty).delete({ where: { referredItem: storeId } });
  },
}));
