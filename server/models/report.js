const { Review } = require("./reviews.js");

module.exports = {
  reportReview: (review_id) => {
    return Review.update(
      {
        reported: true,
      },
      { where: { id: review_id } }
    );
  },
};
