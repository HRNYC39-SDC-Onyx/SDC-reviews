const { Review } = require('./reviews.js')

module.exports = {
  reportReview: (review_id, cb) => {
    Review.update({
      reported: true
    }, { where: { id: review_id }})
    .then(r => cb(null))
    .catch(err => cb(err))
  }
}
