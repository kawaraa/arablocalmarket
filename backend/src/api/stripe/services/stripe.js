"use strict"; /** stripe service */
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

// const priceId = process.env.STRIPE_PRICE_ID;
// const successUrl = process.env.STRIPE_CHECKOUT_SUCCESS_URL;
// const cancelUrl = process.env.STRIPE_CHECKOUT_CANCEL_URL;

// { strapi }
module.exports = () => ({
  // Stripe service methods
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

  // getInvoicesBySub(subId) {
  //   return stripe.invoices.retrieve({ query: `subscriptionId=${subId}` });
  // },
  async deleteCustomer(stripeCustomerId) {
    return stripe.customers.del(stripeCustomerId);
  },
  // async setDefaultPaymentMethod(stripeCustomerId, paymentMethodId) {
  //   const customer = await stripe.customers.update(stripeCustomerId, {
  //     invoice_settings: { default_payment_method: paymentMethodId },
  //   });
  //   return customer;
  // },

  startTrial(customerId, priceId, storeId) {
    return stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_settings: { save_default_payment_method: "on_subscription" },
      trial_period_days: "30",
      collection_method: "send_invoice",
      days_until_due: "1",
      metadata: { storeId },
    });
  },
  createSubscription(customerId, priceId, storeId) {
    return stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      cancel_at_period_end: false,
      // payment_settings: { save_default_payment_method: "on_subscription" },
      collection_method: "send_invoice",
      // expand: ["latest_invoice.payment_intent"],
      // trial_settings: { end_behavior: { missing_payment_method: "pause" } },
      metadata: { storeId },
    });
  },
  updateSubscription(subId, data) {
    return stripe.subscriptions.update(subId, data);
  },
  cancelSubscription(subId) {
    return stripe.subscriptions.cancel(subId);
  },
  getSubscription(subscriptionId) {
    return stripe.subscriptions.retrieve(subscriptionId);
  },
});
