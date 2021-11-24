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

Review.hasMany(Photo, { foreignKey: "review_id" });
Photo.belongsTo(Review, { foreignKey: "id" });

module.exports = {
  Review,

  getReviews: async (product_id, page, count) => {
    try {
      const reviews = await Review.findAll({
        limit: count,
        offset: page * count,
        where: {
          product_id: product_id,
          reported: false,
        },
        include: [
          {
            model: Photo,
          },
        ],
      });

      const formattedReviews = reviews.map((r) => {
        return {
          review_id: r.dataValues.id,
          rating: r.dataValues.rating,
          summary: r.dataValues.summary,
          recommend: r.dataValues.recommend,
          response: r.dataValues.response,
          body: r.dataValues.body,
          date: r.dataValues.date,
          reviewer_name: r.dataValues.reviewer_name,
          helpfulness: r.dataValues.helpfulness,
          photos: r.dataValues.photos.map((p) => {
            return {
              id: p.id,
              url: p.url,
            };
          }),
        };
      });

      const completeReviews = {
        product: product_id,
        page,
        count,
        results: formattedReviews,
      };

      return completeReviews;
    } catch (err) {
      console.error(err);
    }
  },

  postReview: (data, cb) => {
    Review.create({});
  },
};
