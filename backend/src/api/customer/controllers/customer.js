"use strict"; /** customer controller */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::customer.customer", ({ strapi }) => ({
  async create(ctx) {
    const id = ctx.request.body.data.customer?.id;
    ctx.request.body.data.user = ctx.state.user.id + "";
    ctx.request.body.data.name = ctx.state.user.firstName + " " + ctx.state.user.lastName;
    if (!id) return super.create(ctx);

    delete ctx.request.body.data.customer;
    return strapi.service("api::customer.customer").update(id, ctx.request.body);
  },

  async findOne(ctx) {
    if (!ctx.state.user?.id) return ctx.unauthorized();

    const options = { where: { user: ctx.state.user.id }, select: ["id"] };
    ctx.params.id = (await strapi.db.query("api::customer.customer").findOne(options)).id;

    if (!ctx.params.id) return ctx.unauthorized();
    let { data, meta } = await super.findOne(ctx);
    if (!data) return { data, meta };

    data.attributes.workStores?.data?.forEach((s) => {
      s.attributes = strapi
        .service("api::store.store")
        .removePrivateFields(ctx.state?.user?.id, s.attributes);
    });

    return { data, meta };
  },

  async find(ctx) {
    let storeId = ctx.query.filters?.orders?.store?.id?.$eq;
    if (!storeId) storeId = ctx.query.filters?.workStores?.id?.$eq;
    if (!storeId) return ctx.unauthorized();

    const owner = await strapi.service("api::store.store").checkStoreOwner(ctx, storeId);
    if (!owner) return ctx.unauthorized();

    return super.find(ctx);
  },

  async update(ctx) {
    const options = { where: { user: ctx.state.user.id }, select: ["id"] };
    ctx.params.id = (await strapi.db.query("api::customer.customer").findOne(options)).id;

    if (!ctx.params.id) return ctx.unauthorized();

    ctx.request.body.data.user = ctx.state.user.id + "";
    ctx.request.body.data.name = ctx.state.user.firstName + " " + ctx.state.user.lastName;
    return super.update(ctx);
  },
}));
