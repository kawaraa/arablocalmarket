"use strict"; /** store service */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::store.store", ({ strapi }) => ({
  async checkStoreOwner(ctx, storeId) {
    let id = storeId || ctx.request.body?.data?.storeId;
    if (!id) id = JSON.parse(ctx.request.body?.data)?.storeId;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id } };
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

    if (store.ratings) {
      store.ratings = this.calculateStars(userId, store.ratings.data);
    }
    return store;
  },

  calculateStars(userId, ratings) {
    let userStars = 0;
    const total = ratings.length;

    const totalStars = ratings.reduce((total, rate) => {
      const stars = rate.stars || rate.attributes?.stars;
      const user = rate.customer?.userId || rate.attributes?.customer?.data?.attributes.userId;
      if (userId && userId == user) userStars = stars;
      return total + stars;
    }, 0);

    return { stars: totalStars / total, total, userStars };
  },
}));
