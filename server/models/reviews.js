const { DataTypes } = require('sequelize')
const db = require('../../db')

const Review = db.define('reviews', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  product_id: { type: DataTypes.INTEGER },
  rating: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATEONLY },
  summary: { type: DataTypes.TEXT },
  body: { type: DataTypes.TEXT },
  recommend: { type: DataTypes.BOOLEAN },
  reported: { type: DataTypes.BOOLEAN },
  reviewer_name: { type: DataTypes.TEXT },
  reviewer_email: { type: DataTypes.TEXT },
  response: { type: DataTypes.TEXT },
  helpfulness: { type: DataTypes.INTEGER }
}, {
  timestamps: false
})

module.exports = {
  Review,
  getReviews: (product_id, cb) => {
    Review.findAll({
      where: {
        product_id: product_id
      },
      raw: true,
      // limit: 10
    })
    .then(r => !r.length ? cb(err) : cb(null, r))
    .catch(err => cb(err))
  },

  postReview: (data, cb) => {
    Review.create({

    })
  }
}
