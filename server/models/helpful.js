const { Review } = require('./reviews.js')

module.exports = {
  markHelpful: (review_id, cb ) => {
    Review.increment('helpfulness', { by: 1, where: { id: review_id }, returning: false})
    .then(r => cb(null))
    .catch(err => cb(err))
  }
}