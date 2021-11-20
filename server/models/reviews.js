const { DataTypes } = require('sequelize')
const { reviews } = require('.')
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

const Photo = db.define('photos', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  review_id: { type: DataTypes.INTEGER },
  url: { type: DataTypes.TEXT }
}, {
  timestamps: false
})

Review.hasMany(Photo, { foreignKey: 'review_id' })
Photo.belongsTo(Review, { foreignKey: 'id' })

module.exports = {
  Review,

  // getReviews: (product_id, cb) => {
  //   Review.findAll({
  //     where: {
  //       product_id: product_id
  //     },
  //     raw: true,
  //     include: [
  //       {
  //         model: Photos,
  //         raw: true
  //       }
  //     ]
  //     // limit: 10
  //   })
  //   .then(r => !r.length ? cb(err) : cb(null, r))
  //   .catch(err => cb(err))
  // },

  getReviews: (product_id, cb) => {
    Review.findAll({
      where: {
        product_id: product_id
      },
      raw: true
    })
    .then(reviews => {
      reviews.map(review => {
        const review_id = review.id
        return Photo.findAll({
          where: {
            review_id: review_id
          },
          raw: true
        })
        .then(photos => {
          return photos.map(photo => {
            return {
              id: photo.id,
              url: photo.url
            }
          })
        })
        .then(photosArray => {
          const r = {
            ...review,
            photos: photosArray
          }
          console.log(r)
          // !reviews.length ? cb(err) : cb(null, r)
        })
        .catch(err => cb(err))
      })
    })
  },

  postReview: (data, cb) => {
    Review.create({

    })
  }
}
