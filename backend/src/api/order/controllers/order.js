"use strict"; /** order controller */
const crypto = require("crypto");

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const oldItems = ctx.request.body.data.lineItems;

    const store = await strapi.service("api::store.store").findOne(ctx.request.body.data.storeId);

    const { results } = await strapi.service("api::product.product").find({
      filters: { id: oldItems.map(({ productNumber }) => productNumber) },
      populate: { variants: { populate: { options: true } } },
    });

    const items = [];
    for (const product of results) {
      const it = oldItems.find((item) => item.productNumber == product.id);
      if (!it) continue;
      for (const variant of product.variants) {
        if (it.barcode != variant.barcode) continue;
        items.push({
          productNumber: product.id + "",
          barcode: variant.barcode,
          title: product.name + " " + variant.options.map((op) => op.value).join(" - "),
          price: variant.price,
          discount: variant.discount || 0,
          quantity: it.quantity,
        });
      }
    }

    if (ctx.state.user) {
      const options = { where: { user: ctx.state.user.id }, select: ["id"] };
      ctx.request.body.data.customer = (await strapi.db.query("api::customer.customer").findOne(options)).id;
    } else {
      let name = "Visitor";
      if (ctx.request.body.data.address) {
        name = ctx.request.body.data.address.firstName + " " + ctx.request.body.data.address.lastName;
      }
      if (ctx.request.body.data.customer) {
        ctx.request.body.data.customer = await strapi
          .service("api::customer.customer")
          .findOne(ctx.request.body.data.customer.id);
      }
      if (!ctx.request.body.data.customer) {
        ctx.request.body.data.customer = await strapi
          .service("api::customer.customer")
          .create({ data: { user: "visitor-" + crypto.randomBytes(16).toString("base64"), name } });
      }
    }

    ctx.request.body.data.store = store.id;
    ctx.request.body.data.lineItems = items;
    ctx.request.body.data.currency = store.currency;
    ctx.request.body.data.total = items.reduce((total, item) => total + item.price * item.quantity, 0);

    await strapi.service("api::order.order").create(ctx.request.body);
    return ctx.request.body;
  },

  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);

    const isOwner = ctx.state.user.id == data.attributes.store?.data?.attributes?.owner;
    const customer = ctx.state.user.id == data.attributes.customer?.user;
    if (!isOwner && !customer) ctx.unauthorized();

    return { data, meta };
  },

  async find(ctx) {
    const fn = strapi.service("api::order.order").normalizeCustomer;
    const { data, meta } = await super.find(ctx);

    let owner = false;
    data.forEach((d) => {
      const isOwner = ctx.state.user.id == d.attributes.store?.data?.attributes?.owner;
      if (isOwner || ctx.state.user.id == d.attributes.customer?.user) owner = true;
      d.attributes.customer = fn(d.attributes.customer);

      d.attributes.store.data.attributes = strapi
        .service("api::store.store")
        .removePrivateFields(ctx.state.user.id, d.attributes.store.data.attributes);
    });

    if (!owner) return ctx.unauthorized();
    return { data, meta };
  },

  async update(ctx) {
    if (!ctx.request.body.data) return super.update(ctx);

    const o = await strapi.service("api::order.order").findOne(ctx.params.id, { populate: { store: true } });
    if (ctx.state.user.id != o.store.owner) ctx.unauthorized();

    Object.keys(ctx.request.body.data).forEach((k) => {
      !["status", "note"].includes(k) && delete ctx.request.body.data[k];
    });

    return super.update(ctx);
  },
}));
