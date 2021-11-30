const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../db");
const { Review, CharacteristicReview } = require("./reviews.js");

const Characteristic = db.define(
  "characteristics",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    product_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.TEXT },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  getMeta: async (product_id) => {
    try {
      const ratings = await Review.findAll({
        where: {
          product_id: product_id,
        },
        attributes: [
          "rating",
          [Sequelize.fn("COUNT", Sequelize.col("rating")), "count"],
        ],
        group: "rating",
        raw: true,
      });

      const formattedRatings = {};
      ratings.forEach((r) => {
        const rating = r.rating;
        const count = r.count;
        formattedRatings[rating] = count;
      });

      const recommended = await Review.findAll({
        where: {
          product_id: product_id,
        },
        attributes: [
          "recommend",
          [Sequelize.fn("COUNT", Sequelize.col("recommend")), "count"],
        ],
        group: "recommend",
        raw: true,
      });

      const formattedRecommended = {};
      recommended.forEach((r) => {
        const recommened = r.recommend;
        const count = r.count;
        formattedRecommended[recommened] = count;
      });

      const chars = await Characteristic.findAll({
        where: {
          product_id: product_id,
        },
        raw: true,
      });

      const formattedChars = {};
      chars.forEach((c) => {
        const name = c.name;
        const chars_id = c.id;
        formattedChars[name] = {
          id: chars_id,
        };
      });

      const chars_ratings = await Review.findAll({
        where: {
          product_id: product_id,
        },
        include: [
          {
            model: CharacteristicReview,
          },
        ],
      });

      const formattedCharsRatings = {};
      chars_ratings.forEach((c) => {
        c.characteristics_reviews.forEach((cr, i) => {
          const char_id = cr.dataValues.characteristics_id;
          const value = cr.dataValues.value;
          if (!formattedCharsRatings[char_id]) {
            formattedCharsRatings[char_id] = value / chars_ratings.length;
          } else {
            formattedCharsRatings[char_id] =
              formattedCharsRatings[char_id] + value / chars_ratings.length;
          }
        });
      });

      for (let char in formattedChars) {
        const id = formattedChars[char].id;
        formattedChars[char].value = formattedCharsRatings[id];
      }

      const meta = {
        product_id,
        ratings: formattedRatings,
        recommended: formattedRecommended,
        characteristics: formattedChars,
      };

      return meta;
    } catch (err) {
      throw new Error(err);
    }
  },
};
