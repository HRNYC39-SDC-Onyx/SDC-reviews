const models = require('../models')

module.exports = {
  get: (req, res) => {
    const { product_id, page = 0, count = 5 } = req.query
    !product_id && res.status(422).send('Error: invalid product_id provided')
    models.reviews.getReviews(product_id, (err, r) => {
      const rformat =  {
        product: product_id,
        page,
        count,
        results: r
      }
      err ? res.status(422).send('Error: invalid product_id provided') : res.status(200).send(rformat)
    })
  },

  post: (req, res) => {
    // console.log(req.body);
    // models.reviews.postReview(req.body, (err, r) => {
    //   err ? console.error('error posting review - controller', err) : console.log('successfully posted review', r)
    // })
  }
}
