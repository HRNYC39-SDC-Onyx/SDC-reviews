const models = require("../models");

module.exports = {
  get: async (req, res) => {
    try {
      const { product_id, page = 0, count = 5 } = req.query;
      !product_id && res.status(422).send("Error: invalid product_id provided");
      const reviewsAndPhotos = await models.reviews.getReviews(product_id);
      const reviews = reviewsAndPhotos.reviews;
      const photos = reviewsAndPhotos.photos;

      const newReviews = reviews.map((r) => {
        return {
          review_id: r.id,
          rating: r.rating,
          summary: r.summary,
          recommend: r.recommend,
          response: r.response,
          body: r.body,
          date: r.date,
          reviewer_name: r.reviewer_name,
          helpfulness: r.helpfulness,
          photos: [],
        };
      });

      for (let i = 0; i < newReviews.length; i++) {
        for (let j = 0; j < photos.length; j++) {
          if (photos[j].length > 0) {
            for (let k = 0; k < photos[j].length; k++) {
              if (newReviews[i].review_id === photos[j][k].review_id) {
                delete photos[j][k].review_id;
                newReviews[i].photos = photos[j];
              }
            }
          }
        }
      }

      const formattedResult = {
        product: product_id,
        page,
        count,
        results: newReviews,
      };

      res.status(200).send(formattedResult);
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
