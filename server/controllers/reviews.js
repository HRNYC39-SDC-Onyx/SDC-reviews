const models = require("../models");

module.exports = {
  get: async (req, res) => {
    try {
      const { product_id, page = 0, count = 5 } = req.query;
      !product_id && res.status(422).send("Error: invalid product_id provided");
      const reviews = await models.reviews.getReviews(product_id, page, count);
      res.status(200).send(reviews);
    } catch (err) {
      res.status(422).send("Error: invalid product_id provided");
    }
  },

  post: async (req, res) => {
    try {
      const review = req.body;
      await models.reviews.postReview(review);
      res.status(201).send("Created");
    } catch (err) {
      res.status(422).send("Review body contains invalid entries");
    }
  },
};
