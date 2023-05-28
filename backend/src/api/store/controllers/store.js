"use strict"; /** store controller */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::store.store", ({ strapi }) => ({
  async create(ctx) {
    const priceId = ctx.query.subscription;
    const options = { select: ["id"], where: { owner: ctx.state.user.id } };
    const stores = await strapi.query("api::store.store").findMany(options);
    if (stores.length > 2) return ctx.notAcceptable("stores limit");

    const newStore = JSON.parse(ctx.request.body.data);
    newStore.owner = +ctx.state.user.id;
    newStore.meta = { phone: ctx.state.user.phone };

    const { line1, line2, city, postalCode, country } = newStore.address;
    const { email, firstName, lastName } = ctx.state.user;
    const name = firstName + " " + lastName;
    const address = { line1, line2, postal_code: postalCode, city, country };

    ctx.request.body.data = JSON.stringify(newStore);

    const res = await super.create(ctx);

    const c = await strapi.service("api::stripe.stripe").createCustomer({ name, email, address });
    const { id, status } = await strapi.service("api::stripe.stripe").startTrial(c.id, priceId);

    const userRes = await strapi
      .query("plugin::users-permissions.user")
      .update({ where: { id: userId }, data: { stripeId: c.id } });
    const storeRes = strapi
      .query("api::store.store")
      .update({ where: { id: res.data.id }, data: { subscriptionId: id, subscriptionStatus: status } });

    await Promise.all([userRes, storeRes]);

    return res;
  },

  async findOne(ctx) {
    const result = await super.findOne(ctx);
    if (!result || !result.data) return ctx.notFound();
    const user = ctx.state.user?.id;

    result.data.attributes = strapi
      .service("api::store.store")
      .removePrivateFields(user, result.data.attributes);

    if (result.data.attributes.ratings && user) {
      const rating = await strapi
        .query("api::rating.rating")
        .findOne({ data: { where: { customer: { user: user }, store: result.data.attributes.id } } });
      result.data.attributes.ratings.userStars = rating.stars;
    }

    return result;
  },

  async find(ctx) {
    let { data, meta } = await super.find(ctx);
    if (!data || !data[0]) return { data, meta };

    data = data.map(({ id, attributes }) => {
      attributes.id = id;
      return strapi.service("api::store.store").removePrivateFields(ctx.state.user?.id, attributes);
    });

    return { data, meta };
  },

  async update(ctx) {
    const id = ctx.params.id;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id }, populate: ["cover"] };
    const store = await strapi.query("api::store.store").findOne(options);
    if (!store || !store.id) return ctx.unauthorized();
    if (ctx.request.files && store.cover) {
      strapi.plugins.upload.services.upload.remove(store.cover);
      const d = JSON.parse(ctx.request.body.data);
      delete d.owner;
      delete d.publishedAt;
      ctx.request.body.data = JSON.stringify(d);
    } else {
      delete ctx.request.body.data.owner;
      delete ctx.request.body.data.publishedAt;
    }
    return super.update(ctx);
  },

  async delete(ctx) {
    const id = ctx.params.id;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id }, populate: ["cover"] };
    const store = await strapi.query("api::store.store").findOne(options);
    if (!store || !store.id) return ctx.unauthorized();
    await strapi.service("api::product.product").deleteStoreProductsWithMediaFiles(id);
    if (store.cover) await strapi.plugins.upload.services.upload.remove(store.cover);
    return super.delete(ctx);
  },
}));
