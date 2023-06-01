"use strict"; /** product service */
const { createCoreService } = require("@strapi/strapi").factories;
const proEty = "api::product.product";

module.exports = createCoreService(proEty, ({ strapi }) => ({
  async deleteProductWithMediaFiles(id) {
    const options = { select: ["id"], where: { id }, populate: ["image"] };
    const product = await strapi.query(proEty).findOne(options);

    if (!product || !product.id) return null;
    if (product.image) await strapi.plugins.upload.services.upload.remove(product.image);

    return strapi.query(proEty).delete({ where: { id } });
  },

  async deleteStoreProductsWithMediaFiles(storeId) {
    const options = { select: ["id"], where: { storeId }, populate: ["image"] };
    const results = await strapi.query(proEty).findMany(options);
    if (!results[0]) return;

    await Promise.all(
      results.map(async ({ id, image }) => {
        if (image) await strapi.plugins.upload.services.upload.remove(image);
        return strapi.query(proEty).delete({ where: { id } });
      })
    );

    return this.deleteStoreProductsWithMediaFiles(storeId);
  },
}));
