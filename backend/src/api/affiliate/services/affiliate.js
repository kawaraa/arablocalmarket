"use strict"; /** affiliate service */
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::affiliate.affiliate", ({ strapi }) => ({
  // Todo: Make sure the "price" is always in cent format
  syncActivity(referredItem, status, price) {
    const where = { referredItem };
    const data = { active: ["active", "trialing"].includes(status) };
    if (price >= 0) data.price = price / 100;

    return strapi.service(affEty).update({ where, data });
  },
  deleteByStore(storeId) {
    return strapi.query(affEty).delete({ where: { referredId: storeId } });
  },
}));
