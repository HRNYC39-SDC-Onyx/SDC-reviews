const models = require('../models')

module.exports = {
  get: (req, res) => {
    const { product_id, page = 0, count = 5 } = req.query
    !product_id && res.status(422).send('Error: invalid product_id provided')
    models.reviews.getReviews(product_id, (err, r) => {
      const newResult = r.map(d => {
        return {
          review_id: d.id,
          rating: d.rating,
          summary: d.summary,
          recommend: d.recommend,
          response: d.response,
          body: d.body,
          date: d.date,
          reviewer_name: d.reviewer_name,
          helpfulness: d.helpfulness
        }
      })
      const formattedResult =  {
        product: product_id,
        page,
        count,
        results: newResult
      }
      err ? res.status(422).send('Error: invalid product_id provided') : res.status(200).send(formattedResult)
    })
  },

  post: (req, res) => {
    // console.log(req.body);
    // models.reviews.postReview(req.body, (err, r) => {
    //   err ? console.error('error posting review - controller', err) : console.log('successfully posted review', r)
    // })
  }
}
