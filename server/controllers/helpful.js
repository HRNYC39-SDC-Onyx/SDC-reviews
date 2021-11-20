const models = require('../models')

module.exports = {
  put: (req, res) => {
    const review_id = req.params.review_id
    !review_id && res.status(404).send('Error: invalid review id provided')
    models.helpful.markHelpful(review_id, err => {
      err ? res.status(500).send('An error occurred. If this error persists, contact your instruction team') : res.status(204).send()
    })
  }
}