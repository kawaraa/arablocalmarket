"use strict"; /** store controller */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::store.store", ({ strapi }) => ({
  async create(ctx) {
    const { data, meta } = await super.create(ctx);
    await strapi.service("api::store.store").update(data.id, { data: { owner: ctx.state.user.id } });
    return { data, meta };
  },

  async findOne(ctx) {
    const { data, meta } = await super.find(ctx);
    let owner = false;

    if (ctx.state.user) {
      const store = await strapi.db
        .query("api::store.store")
        .findOne({ select: ["id"], where: { owner: ctx.state.user.id } });
      owner = store?.id ? true : false;
    }

    if (!owner) data.forEach((s) => delete s.attributes.cocNumber + delete s.attributes.vatNumber);
    return data[0];
  },

  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    data.forEach((s) => delete s.attributes.cocNumber + delete s.attributes.vatNumber);
    return { data, meta };
  },

  async update(ctx) {
    const id = ctx.params.id;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id }, populate: ["cover"] };

    const store = await strapi.db.query("api::store.store").findOne(options);
    if (store?.id != id) return ctx.unauthorized();
    if (ctx.request.files && store.cover) strapi.plugins.upload.services.upload.remove(store.cover);

    return super.update(ctx);
  },

  async delete(ctx) {
    const id = ctx.params.id;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id } };

    const store = await strapi.db.query("api::store.store").findOne(options);
    if (store?.id != id) return ctx.unauthorized();

    return super.delete(ctx);
  },
}));
