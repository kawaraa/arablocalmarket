"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async create(ctx) {
    const id = JSON.parse(ctx.request.body?.data)?.storeId;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id } };
    const store = await strapi.db.query("api::store.store").findOne(options);
    if (store?.id != id) return ctx.unauthorized();
    return super.create(ctx);
  },

  async update(ctx) {
    const id = ctx.request.body?.data?.storeId;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id } };
    const store = await strapi.db.query("api::store.store").findOne(options);
    if (store?.id != id) return ctx.unauthorized();

    if (ctx.request.files) {
      const p = await strapi.db
        .query("api::product.product")
        .findOne({ where: { id: ctx.params.id }, populate: ["image"] });
      if (p.image) strapi.plugins.upload.services.upload.remove(p.image);
    }

    return super.update(ctx);
  },

  async delete(ctx) {
    const id = ctx.request.body?.data?.storeId;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id } };
    const store = await strapi.db.query("api::store.store").findOne(options);
    if (store?.id != id) return ctx.unauthorized();

    return super.delete(ctx);
  },
}));
