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
    const error = "Only the owner of the store can update the store";
    const options = { select: ["id"], where: { id: ctx.params.id, owner: ctx.state.user.id } };

    const store = await strapi.db.query("api::store.store").findOne(options);
    if (store?.id != ctx.params.id) return ctx.unauthorized(error);

    return super.update(ctx);
  },
}));
