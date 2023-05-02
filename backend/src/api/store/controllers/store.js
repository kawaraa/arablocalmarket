"use strict"; /** store controller */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::store.store", ({ strapi }) => ({
  async create(ctx) {
    const newStore = JSON.parse(ctx.request.body.data);
    newStore.owner = +ctx.state.user.id;
    newStore.meta = { phone: ctx.state.user.phone };
    ctx.request.body.data = JSON.stringify(newStore);

    return super.create(ctx);
  },

  async findOne(ctx) {
    const result = await super.findOne(ctx);
    if (!result || !result.data) return ctx.notFound();

    result.data.attributes = strapi
      .service("api::store.store")
      .removePrivateFields(ctx.state?.user?.id, result.data.attributes);
    return result;
  },

  async find(ctx) {
    let { data, meta } = await super.find(ctx);
    if (!data || !data[0]) return { data, meta };

    data = data.map(({ id, attributes }) => {
      attributes.id = id;
      return strapi.service("api::store.store").removePrivateFields(ctx.state?.user?.id, attributes);
    });

    return { data, meta };
  },

  async update(ctx) {
    const id = ctx.params.id;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id }, populate: ["cover"] };
    const store = await strapi.db.query("api::store.store").findOne(options);
    if (!store || !store.id) return ctx.unauthorized();
    if (ctx.request.files && store.cover) strapi.plugins.upload.services.upload.remove(store.cover);
    delete ctx.request.body.data.owner;
    return super.update(ctx);
  },

  async delete(ctx) {
    const id = ctx.params.id;

    const options = { select: ["id"], where: { id, owner: ctx.state.user.id }, populate: ["cover"] };
    const store = await strapi.db.query("api::store.store").findOne(options);

    if (!store || !store.id) return ctx.unauthorized();

    await strapi.service("api::product.product").deleteStoreProductsWithMediaFiles(id);

    if (store.cover) await strapi.plugins.upload.services.upload.remove(store.cover);

    return super.delete(ctx);
  },
}));
