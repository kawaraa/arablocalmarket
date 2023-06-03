"use strict"; /** store service */
const { createCoreService } = require("@strapi/strapi").factories;
const storeEty = "api::store.store";

module.exports = createCoreService(storeEty, ({ strapi }) => ({
  async checkStoreOwner(ctx, storeId) {
    let id = storeId || ctx.request.body?.data?.storeId;
    if (!id) id = JSON.parse(ctx.request.body?.data)?.storeId;
    const options = { where: { id, owner: ctx.state.user.id }, select: ["id"] };
    const store = await strapi.db.query(storeEty).findOne(options);
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

  getStripeFields(id) {
    return strapi
      .query(storeEty)
      .findOne({ where: { id }, select: ["subscriptionId", "subscriptionStatus"] });
  },

  isPublic(store, user) {
    const owner = store.owner || store.attributes.owner;
    const status = store.subscriptionStatus || store.attributes.subscriptionStatus;
    return owner == user || ["active", "trialing"].includes(status);
  },

  async deleteStoreAndItsProducts(storeId, store) {
    const options = { select: ["id", "subscriptionId"], where: { id: storeId }, populate: ["cover"] };
    if (!store) store = store = await strapi.query(storeEty).findOne(options);

    await Promise.all([
      strapi.service("api::affiliate.affiliate").deleteByStore(store.id),
      strapi.service("api::stripe.stripe").cancelSubscription(store.subscriptionId),
      strapi.service("api::order.order").deleteOrdersByStore(store.id),
      strapi.service("api::product.product").deleteStoreProductsWithMediaFiles(store.id),
      !store.cover ? null : strapi.plugins.upload.services.upload.remove(store.cover),
    ]);

    await strapi.query(storeEty).delete({ where: { id: s.id } });
  },
}));
