const models = require("../models");

module.exports = {
  get: async (req, res) => {
    try {
      const { product_id } = req.query;
      !product_id && res.status(422).send("Error: invalid product_id provided");
      const meta = await models.meta.getMeta(product_id);
      res.status(200).send(meta);
    } catch (err) {
      res.status(422).send("Error: invalid product_id provided");
    }
  },
};
