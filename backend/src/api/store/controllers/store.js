"use strict"; /** store controller */
const { createCoreController } = require("@strapi/strapi").factories;
const storeEty = "api::store.store";
const stripeEty = "api::stripe.stripe";
const affEty = "api::affiliate.affiliate";

module.exports = createCoreController(storeEty, ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const referralId = ctx.cookies.get("referral") || ctx.query.referral || null;
    const priceId = ctx.query.subscription;
    const options = { select: ["id"], where: { owner: user.id } };
    const stores = await strapi.query(storeEty).findMany(options);
    if (stores.length > 2) return ctx.notAcceptable("stores limit");

    const newStore = JSON.parse(ctx.request.body.data);
    newStore.owner = +user.id;
    newStore.meta = { phone: user.phone };

    const { line1, line2, city, postalCode, country } = newStore.address;
    const { email, firstName, lastName } = user;
    const name = firstName + " " + lastName;
    const address = { line1, line2, postal_code: postalCode, city, country };

    ctx.request.body.data = JSON.stringify(newStore);

    const res = await super.create(ctx);

    const c = user.stripeId || (await strapi.service(stripeEty).createCustomer({ name, email, address })).id;
    const { id, status, plan } = await strapi
      .service(stripeEty)
      .startTrial(c, priceId, res.data.id, referralId);

    const userRes = strapi.entityService.update("plugin::users-permissions.user", user.id, {
      data: { stripeId: c },
    });

    const storeRes = strapi
      .service(storeEty)
      .update(res.data.id, { data: { subscriptionId: id, subscriptionStatus: status } });

    await Promise.all([userRes, storeRes]);

    if (referralId) {
      await strapi.service(affEty).create({
        data: { user: +referralId, referredItem: res.data.id, price: 0, active: true },
      });
    }
    return res;
  },

  async findOne(ctx) {
    const result = await super.findOne(ctx);
    const user = ctx.state.user?.id;
    if (!result?.data || !strapi.service(storeEty).isPublic(result.data, user)) {
      return ctx.notFound();
    }

    result.data.attributes = strapi.service(storeEty).removePrivateFields(user, result.data.attributes);

    if (result.data.attributes.ratings && user) {
      const rating = await strapi
        .query("api::rating.rating")
        .findOne({ where: { customer: { user: user }, store: { id: result.data.id } } });
      if (rating?.stars) result.data.attributes.ratings.userStars = rating.stars;
    }

    return result;
  },

  async find(ctx) {
    let { data, meta } = await super.find(ctx);
    if (!data || !data[0]) return { data, meta };
    const user = ctx.state.user?.id;

    data = data
      .filter((s) => strapi.service(storeEty).isPublic(s, user))
      .map(({ id, attributes }) => {
        attributes.id = id;
        return strapi.service(storeEty).removePrivateFields(user, attributes);
      });
    return { data, meta };
  },

  async update(ctx) {
    const id = ctx.params.id;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id }, populate: ["cover"] };
    const store = await strapi.query(storeEty).findOne(options);
    if (!store || !store.id) return ctx.unauthorized();
    if (ctx.request.files && store.cover) {
      strapi.plugins.upload.services.upload.remove(store.cover);
      const d = JSON.parse(ctx.request.body.data);
      delete d.owner;
      delete d.publishedAt;
      delete d.subscriptionStatus;
      ctx.request.body.data = JSON.stringify(d);
    } else {
      delete ctx.request.body.data.owner;
      delete ctx.request.body.data.publishedAt;
      delete ctx.request.body.data.subscriptionStatus;
    }
    const a = await super.update(ctx);
    return { success: true };
  },

  // Update subscription status on payment success or fail
  async updateSubscriptionStatus(ctx) {
    const { subscriptionId } = await strapi.service(storeEty).getStripeFields(ctx.params.id);
    const { status, plan } = await strapi.service(stripeEty).getSubscription(subscriptionId);

    await strapi.service(affEty).syncActivity(ctx.params.id, status, plan.amount);
    await strapi.service(storeEty).update(ctx.params.id, { data: { subscriptionStatus: status } });

    return { success: true };
  },

  async delete(ctx) {
    const id = ctx.params.id;
    const owner = ctx.state.user.id;
    const options = {
      select: ["id", "subscriptionId", "subscriptionStatus"],
      where: { id, owner },
      populate: ["cover"],
    };
    const store = await strapi.query(storeEty).findOne(options);
    if (!store || !store.id) return ctx.unauthorized();
    await strapi.service("api::store.store").deleteStoreAndItsProducts(id, store);
    return { success: true };
  },
}));
