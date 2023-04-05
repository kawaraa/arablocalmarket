"use strict"; /** store controller */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::store.store", ({ strapi }) => ({
  async create(ctx) {
    const { data, meta } = await super.create(ctx);
    await strapi.service("api::store.store").update(data.id, { data: { owner: ctx.state.user.id } });
    return { data, meta };
  },

  async findOne(ctx) {
    const result = await super.findOne(ctx);
    if (!result) ctx.notFound();

    result.data.attributes = strapi
      .service("api::store.store")
      .removePrivateFields(ctx.state?.user?.id, result.data.attributes);
    return result;
  },

  async find(ctx) {
    let { data, meta } = await super.find(ctx);

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
    if (!store?.id || store?.id != id) return ctx.unauthorized();
    if (ctx.request.files && store.cover) strapi.plugins.upload.services.upload.remove(store.cover);

    return super.update(ctx);
  },

  async delete(ctx) {
    const id = ctx.params.id;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id } };

    const store = await strapi.db.query("api::store.store").findOne(options);
    if (!store?.id || store?.id != id) return ctx.unauthorized();

    return super.delete(ctx);
  },
}));
