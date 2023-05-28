module.exports = {
  routes: [
    // {
    //   method: "GET",
    //   path: "/stripe/subscriptions",
    //   handler: "stripe.find",
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
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
      path: "/stripe/upgrade",
      handler: "stripe.upgrade",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/stripe/cancel",
      handler: "stripe.cancel",
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
