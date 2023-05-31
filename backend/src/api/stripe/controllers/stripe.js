"use strict"; /** A set of functions called "actions" for `stripe` */

module.exports = {
  async findOne({ state: { user }, query: { storeId } }) {
    const { subscriptionId } = await strapi.service("api::store.store").getStripeFields(storeId);
    const sub = await strapi.service("api::stripe.stripe").getSubscription(subscriptionId);
    const { data } = await strapi.service("api::stripe.stripe").getPaymentMethods(user.stripeId);
    strapi.service("api::store.store").update(storeId, { data: { subscriptionStatus: sub.status } });

    const { id, type, created, card } = data.find((p) => p.id == sub.default_payment_method) || {};
    // const pm = { id, type, created, brand: card?.brand, last4: card?.last4, country: card?.country };

    return {
      id: sub.plan.id, // priceId
      amount: sub.plan.amount,
      status: sub.status, // active, inactive, trialing
      start: sub.start_date,
      created: sub.created,
      ends: sub.ended_at, // ends on
      trialPeriod: sub.plan.trial_period_days, // Trial 30 days
      trialStart: sub.trial_start,
      trialEnd: sub.trial_end, // Trialing until
      currentPeriodStart: sub.current_period_start,
      currentPeriodEnd: sub.current_period_end,
      billingMethod: sub.collection_method, // "send_invoice", "charge_automatically"
      canceledAt: sub.canceled_at,
      paymentMethod: type, // // null, "card_1NC4fQHfSNaTv5C9kop9ixuW"
      invoices: [], // Todo: Invoices: amount, date
    };
  },
  async upgradeDowngrade(ctx) {
    const ps = await strapi.query("api::product.product").count({ where: { storeId: ctx.query.storeId } });
    const plan = await strapi.service("api::stripe.stripe").getPlan(ctx.query.priceId);
    if (+plan.product.metadata.products < ps) return ctx.notAcceptable("Too many products");

    const store = await strapi.service("api::store.store").getStripeFields(ctx.query.storeId);
    const currentSub = await strapi.service("api::stripe.stripe").getSubscription(store?.subscriptionId);

    const sub = await strapi.service("api::stripe.stripe").updateSubscription(currentSub.id, {
      cancel_at_period_end: false,
      proration_behavior: "none",
      items: [{ id: currentSub.items.data[0].id, price: ctx.query.priceId }],
    });

    return {
      id: sub.plan.id,
      amount: sub.plan.amount,
      status: sub.status,
      start: sub.start_date,
      created: sub.created,
      ends: sub.ended_at,
      trialPeriod: sub.plan.trial_period_days,
      trialStart: sub.trial_start,
      trialEnd: sub.trial_end,
      currentPeriodStart: sub.current_period_start,
      currentPeriodEnd: sub.current_period_end,
      billingMethod: sub.collection_method,
      canceledAt: sub.canceled_at,
      paymentMethod: sub.default_payment_method,
      invoices: [],
    };
  },
  async cancel(ctx) {
    const store = await strapi.service("api::store.store").getStripeFields(ctx.query.storeId);
    await strapi.service("api::stripe.stripe").cancelSubscription(store.subscriptionId);
    return { success: true };
  },
  async create(ctx) {
    const c = ctx.state.user.stripeId;
    const { storeId, priceId } = ctx.request.body;
    const { id, status, latest_invoice } = await strapi
      .service("api::stripe.stripe")
      .createSubscription(c, priceId, storeId);
    await strapi
      .query("api::store.store")
      .update({ where: { id: storeId }, data: { subscriptionId: id, subscriptionStatus: status } });
    const invoice = await strapi.service("api::stripe.stripe").getInvoice(latest_invoice);

    return { paymentUrl: invoice.hosted_invoice_url };
  },
  async checkout(ctx) {
    const store = await strapi.service("api::store.store").getStripeFields(ctx.params.storeId);
    const currentSub = await strapi.service("api::stripe.stripe").getSubscription(store?.subscriptionId);
    const invoice = await strapi.service("api::stripe.stripe").getInvoice(currentSub.latest_invoice);
    return { paymentUrl: invoice.hosted_invoice_url };
  },
  async paymentMethods(ctx) {
    const { data } = await strapi.service("api::stripe.stripe").getPaymentMethods(ctx.state.user.stripeId);
    return data.map(({ id, type, created, card }) => ({
      id,
      type,
      created,
      brand: card?.brand,
      last4: card?.last4,
      country: card?.country,
    }));
  },
  async deletePaymentMethod({ state, params }) {
    const { data } = await strapi.service("api::stripe.stripe").getPaymentMethods(state.user.stripeId);
    await strapi.service("api::stripe.stripe").deletePaymentMethod(data.find((p) => p.id == params.id)?.id);
    return { success: true };
  },
  async webhook(ctx) {
    await strapi.query("api::store.store").update({
      where: { subscriptionId: ctx.request.body.data.object.id },
      data: { subscriptionStatus: ctx.request.body.data.object.status },
    });

    return { success: true };
  },
};
