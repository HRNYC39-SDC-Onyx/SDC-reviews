const { Review } = require("./reviews.js");

module.exports = {
  markHelpful: (review_id) => {
    return Review.increment("helpfulness", {
      by: 1,
      where: { id: review_id },
      returning: false,
    });
  },
};
