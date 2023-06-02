"use strict"; /** order controller */
const { createCoreController } = require("@strapi/strapi").factories;
const crypto = require("crypto");
const orderEty = "api::order.order";
const proEty = "api::product.product";
const notificationTypes = ["READY", "SENT", "DELIVERED", "CANCELED", "RETURNED"];

module.exports = createCoreController(orderEty, ({ strapi }) => ({
  async create(ctx) {
    const posOrder = ctx.request.body.data?.customer?.id == 1;
    const oldItems = ctx.request.body.data.lineItems;

    const store = await strapi.service("api::store.store").findOne(ctx.request.body.data.storeId);
    if (!store?.owner) return ctx.badRequest();

    if (posOrder && store?.owner != ctx.state.user?.id) return ctx.unauthorized();

    const { results } = await strapi.service(proEty).find({
      filters: { id: oldItems.map(({ productNumber }) => productNumber) },
      populate: { image: true, variants: { populate: { options: true } } },
    });

    if (!results || !results[0]) return ctx.unauthorized();

    for (const product of results) {
      const index = oldItems.findIndex((item) => item.productNumber == product.id);
      if (index < 0) return ctx.unauthorized();

      for (const variant of product.variants) {
        if (oldItems[index].barcode != variant.barcode) continue;
        oldItems[index].productNumber = product.id + "";
        oldItems[index].title = product.name + " " + variant.options.map((op) => op.value).join(" - ");
        oldItems[index].price = variant.price;
        oldItems[index].discount = variant.discount || 0;
        oldItems[index].imageUrl = product.image.formats.thumbnail.url;
        variant.quantity -= +oldItems[index].quantity;

        if (variant.quantity < 0) return ctx.badRequest();
        else if (variant.quantity <= 10) {
          strapi.service("api::notification.notification").notify(store.owner, "STOCK_WARN", {
            path: `/admin/store/${store.id}/product/${product.id}`,
            productName: product.name,
          });
        }
      }
    }

    if (!posOrder && ctx.state.user) {
      const options = { where: { user: ctx.state.user.id }, select: ["id"] };
      ctx.request.body.data.customer = (await strapi.db.query("api::customer.customer").findOne(options)).id;
    } else if (!posOrder) {
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
    ctx.request.body.data.lineItems = oldItems;
    ctx.request.body.data.currency = store.currency;
    ctx.request.body.data.total = oldItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const order = await strapi.service(orderEty).create(ctx.request.body);

    await Promise.all(
      results.map((p) => {
        return strapi.service(proEty).update(p.id, { data: { variants: p.variants } });
      })
    );

    strapi.service("api::notification.notification").notify(store.owner, "ORDER_CREATED", {
      path: `/admin/store/${store.id}?orderId=${order.id}`,
      orderNumber: order.id,
    });

    order.customer = ctx.request.body.data.customer;
    return order;
  },

  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);
    if (!data || !data[0]) return { data, meta };

    const isOwner = ctx.state.user.id == data.attributes.store?.data?.attributes?.owner;
    const customer = ctx.state.user.id == data.attributes.customer?.user;
    if (!isOwner && !customer) return ctx.unauthorized();

    if (data.attributes.store.data) {
      data.attributes.store.data.attributes = strapi
        .service("api::store.store")
        .removePrivateFields(ctx.state.user.id, data.attributes.store.data.attributes);
    }
    return { data, meta };
  },

  async find(ctx) {
    const fn = strapi.service(orderEty).normalizeCustomer;
    const { data, meta } = await super.find(ctx);

    let owner = false;
    if (!data || !data[0]) return { data, meta };

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

    const o = await strapi
      .service(orderEty)
      .findOne(ctx.params.id, { populate: { store: true, customer: true } });
    if (ctx.state.user.id != o?.store?.owner) return ctx.unauthorized();

    Object.keys(ctx.request.body.data).forEach((k) => {
      !["status", "note"].includes(k) && delete ctx.request.body.data[k];
    });

    const status = ctx.request.body.data.status;
    if (notificationTypes.includes(status)) {
      strapi
        .service("api::notification.notification")
        .notify(o.customer.user, "ORDER_" + status, { path: `/order?orderId=${o.id}`, orderNumber: o.id });
    }
    return super.update(ctx);
  },

  async delete(ctx) {
    // Todo: remove delete functionality, use archive instead
    const o = await strapi.service(orderEty).findOne(ctx.params.id, { populate: { store: true } });
    if (ctx.state.user.id != o?.store?.owner) return ctx.unauthorized();

    return super.delete(ctx);
  },
}));
