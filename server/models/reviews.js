const { DataTypes } = require("sequelize");
const db = require("../../db");

const Review = db.define(
  "reviews",
  {
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
    helpfulness: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  }
);

const Photo = db.define(
  "photos",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    review_id: { type: DataTypes.INTEGER },
    url: { type: DataTypes.TEXT },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  Review,

  getReviews: async (product_id) => {
    try {
      const reviews = await Review.findAll({
        where: {
          product_id: product_id,
          reported: false,
        },
        raw: true,
      });
      const photos = await Promise.all(
        reviews.map((r) => {
          const review_id = r.id;
          return Photo.findAll({
            where: { review_id: review_id },
            raw: true,
          });
        })
      );
      return { reviews, photos };
    } catch (err) {
      console.error(err);
    }
  },

  postReview: (data, cb) => {
    Review.create({});
  },
};
