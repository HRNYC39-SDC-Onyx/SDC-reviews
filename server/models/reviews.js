const { DataTypes } = require("sequelize");
const db = require("../../db");

const Review = db.define(
  "reviews",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    recommend: { type: DataTypes.BOOLEAN, allowNull: false },
    reported: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    reviewer_name: { type: DataTypes.TEXT, allowNull: false },
    reviewer_email: { type: DataTypes.TEXT, allowNull: false },
    response: { type: DataTypes.TEXT, defaultValue: "null" },
    helpfulness: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
  },
  {
    timestamps: false,
  }
);

const Photo = db.define(
  "photos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    review_id: { type: DataTypes.INTEGER, allowNull: false },
    url: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    timestamps: false,
  }
);

Review.hasMany(Photo, { foreignKey: "review_id" });
Photo.belongsTo(Review, { foreignKey: "id" });

const CharacteristicReview = db.define(
  "characteristics_reviews",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    characteristics_id: { type: DataTypes.INTEGER, allowNull: false },
    review_id: { type: DataTypes.INTEGER, allowNull: false },
    value: { type: DataTypes.SMALLINT, allowNull: false },
  },
  {
    timestamps: false,
  }
);

Review.hasMany(CharacteristicReview, { foreignKey: "review_id" });
CharacteristicReview.belongsTo(Review, { foreignKey: "id" });

module.exports = {
  Review,
  CharacteristicReview,

  getReviews: async (product_id, page, count) => {
    try {
      const reviews = await Review.findAll({
        limit: count,
        offset: (page - 1) * count,
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
      throw new Error(err);
    }
  },

  postReview: async (review) => {
    try {
      const {
        product_id,
        rating,
        summary,
        body,
        recommend,
        name,
        email,
        photos = [],
        characteristics,
      } = review;
      const date = new Date();

      const newReview = await Review.create({
        product_id,
        rating,
        date,
        summary,
        body,
        recommend,
        reviewer_name: name,
        reviewer_email: email,
      });

      const review_id = newReview.id;

      photos.forEach((p) => {
        const url = p;
        Photo.create({
          review_id,
          url,
        });
      });

      Object.keys(characteristics).forEach((id) => {
        const value = characteristics[id];
        CharacteristicReview.create({
          characteristics_id: id,
          review_id,
          value,
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};
