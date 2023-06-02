"use strict"; /** rating service */
const { createCoreService } = require("@strapi/strapi").factories;
const rEty = "api::rating.rating";

module.exports = createCoreService("api::rating.rating", ({ strapi }) => ({
  async deleteRatingsByUser(userId) {
    const where = { $or: [{ customer: { user: userId } }, { store: null, product: null }] };
    const ratings = await strapi.query(rEty).findMany({ select: ["id"], where });
    if (!ratings[0]) return;

    await Promise.all(ratings.map(({ id }) => strapi.query(rEty).delete({ where: { id } })));

    return this.deleteRatingsByUser(userId);
  },
}));
