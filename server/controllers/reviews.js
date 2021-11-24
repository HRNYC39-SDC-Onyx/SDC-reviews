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

  post: (req, res) => {
    // console.log(req.body);
    // models.reviews.postReview(req.body, (err, r) => {
    //   err ? console.error('error posting review - controller', err) : console.log('successfully posted review', r)
    // })
  },
};
