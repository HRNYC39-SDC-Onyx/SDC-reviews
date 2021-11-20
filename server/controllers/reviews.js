const models = require('../models')

module.exports = {
  get: (req, res) => {
    const product_id = req.query.product_id
    !product_id && res.status(422).send('Error: invalid product_id provided')
    models.reviews.getReviews(product_id, (err, r) => {
      err ? res.status(422).send('Error: invalid product_id provided') : res.status(200).send(r)
    })
  },

  post: (req, res) => {
    // console.log(req.body);
    // models.reviews.postReview(req.body, (err, r) => {
    //   err ? console.error('error posting review - controller', err) : console.log('successfully posted review', r)
    // })
  }
}
