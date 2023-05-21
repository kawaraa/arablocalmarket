"use strict"; /** store service */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::store.store", ({ strapi }) => ({
  async checkStoreOwner(ctx, storeId) {
    let id = storeId || ctx.request.body?.data?.storeId;
    if (!id) id = JSON.parse(ctx.request.body?.data)?.storeId;
    const options = { where: { id, owner: ctx.state.user.id }, select: ["id"] };
    const store = await strapi.db.query("api::store.store").findOne(options);
    return store?.id && store.id == id;
  },

  removePrivateFields(userId, store) {
    if (store.owner == userId) {
      store.favorites = store.favorites?.data?.length || 0;
      store.workers = store.workers?.data?.length || 0;
      store.orders = store.orders?.data?.length || 0;
    } else {
      delete store.owner;
      delete store.cocNumber;
      delete store.vatNumber;
      delete store.favorites;
      delete store.workers;
      delete store.orders;
    }

    if (store.ratings) store.ratings = this.calculateStars(store.ratings.data);
    return store;
  },

  calculateStars(ratings) {
    const total = ratings.length;
    const totalStars = ratings.reduce((total, rate) => total + (rate.stars || rate.attributes?.stars), 0);
    return { stars: totalStars / total || 0, total, userStars: 0 };
  },
}));
