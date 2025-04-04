"use strict"; /** stripe service */
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const redirect = process.env.STRIPE_CHECKOUT_REDIRECT_URL;

// { strapi }
module.exports = () => ({
  async getPlan(priceId) {
    // return stripe.plans.retrieve(priceId);
    const { data } = await stripe.prices.list({ expand: ["data.product"] });
    return data.find((p) => p.id == priceId);
  },

  async createCustomer(data) {
    return stripe.customers.create(data);
  },
  getCustomer(customerId) {
    return stripe.customers.retrieve(customerId);
  },
  // async updateCustomer(stripeCustomerId, data) {
  //   const { name, email, phone, address } = data;

  //   if (address && address.zip_code) address["postal_code"] = address.zip_code;
  //   const { zip_code, ...addressWithoutZipCode } = address;

  //   const customer = await stripe.customers.update(stripeCustomerId, { name, email, phone, address });
  //   return customer;
  // },

  async getPaymentMethods(customerId) {
    return stripe.customers.listPaymentMethods(customerId);
  },
  async deletePaymentMethod(paymentMethodId) {
    return stripe.paymentMethods.detach(paymentMethodId);
  },
  async deleteCustomer(stripeCustomerId) {
    const { data } = await strapi.service("api::stripe.stripe").getPaymentMethods(stripeCustomerId);
    await Promise.all(data.map(({ id }) => this.deletePaymentMethod(id)));
    return stripe.customers.del(stripeCustomerId);
  },

  async getInvoice(invoiceId) {
    return stripe.invoices.retrieve(invoiceId);
  },
  // async getInvoicesByCustomer(stripeCustomerId) {
  //   return stripe.invoices.list({ customer: stripeCustomerId });
  // },
  // getInvoicesBySub(subId) {
  //   return stripe.invoices.retrieve({ query: `subscriptionId=${subId}` });
  // { subscriptionId: subscriptionId }
  // },

  startTrial(customerId, priceId, storeId, referralId) {
    const data = {
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: 30,
      trial_settings: { end_behavior: { missing_payment_method: "cancel" } },
      cancel_at_period_end: false,
      proration_behavior: "none",
      payment_settings: { save_default_payment_method: "on_subscription" },
      // collection_method: "send_invoice",
      // days_until_due: "1",
      metadata: { storeId },
    };
    if (referralId) data.metadata.referralId = referralId;
    return stripe.subscriptions.create(data);
  },
  createSubscription(customerId, priceId, storeId) {
    return stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: "0",
      cancel_at_period_end: false,
      proration_behavior: "none",
      payment_settings: { save_default_payment_method: "on_subscription" },
      collection_method: "charge_automatically",
      payment_behavior: "default_incomplete",
      // expand: ["latest_invoice.payment_intent"],
      metadata: { storeId },
    });
  },
  updateSubscription(subId, data) {
    return stripe.subscriptions.update(subId, data);
  },
  cancelSubscription(subId) {
    return stripe.subscriptions.update(subId, { cancel_at_period_end: true });
  },
  reactivateSubscription(subId) {
    return stripe.subscriptions.update(subId, { cancel_at_period_end: false });
  },
  getSubscription(subscriptionId) {
    return stripe.subscriptions.retrieve(subscriptionId);
  },

  // verifyWebHook(body, sig, secret) {
  //   return stripe.webhooks.constructEvent(body, sig, secret);
  // },
  // createCheckout(customerId, priceId, storeId) {
  //   return stripe.checkout.sessions.create({
  //     mode: "subscription",
  //     customer: customerId,
  //     line_items: [{ price: priceId, quantity: 1 }],
  //     success_url: `/${redirect}/success?storeId=${storeId}`,
  //     cancel_url: `/${redirect}/failed?storeId=${storeId}`,
  //   });
  // },
  // async createPaymentSetupCheckout(customerId, subscriptionId, storeId) {
  //   const session = await stripe.checkout.sessions.create({
  //     // payment_method_types: ["card"],
  //     mode: "setup",
  //     customer: customerId,
  //     setup_intent_data: { metadata: { customer_id: customerId, subscription_id: subscriptionId } },
  //     success_url: `/${redirect}/success?storeId=${storeId}?session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `/${redirect}/failed?storeId=${storeId}`,
  //   });
  //   console.log(session);
  //   return session;
  // },
});
