module.exports = {
  routes: [
    {
      method: "POST",
      path: "/stripe/create",
      handler: "stripe.create",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/stripe/subscription",
      handler: "stripe.findOne",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/stripe/update",
      handler: "stripe.upgradeDowngrade",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/stripe/checkout/:storeId",
      handler: "stripe.checkout",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/stripe/cancel",
      handler: "stripe.cancel",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/stripe/cancel",
      handler: "stripe.reactivate",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/stripe/payment-method",
      handler: "stripe.paymentMethods",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/stripe/payment-method/:id",
      handler: "stripe.deletePaymentMethod",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/stripe/webhook",
      handler: "stripe.webhook",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
