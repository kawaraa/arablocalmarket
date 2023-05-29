module.exports = {
  routes: [
    {
      method: "PATCH",
      path: "/stores/:id",
      handler: "store.updateStatus",
    },
  ],
};
