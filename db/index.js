const { Sequelize } = require("sequelize");
const { host, port, database, user, password } = require("../config.js");

const db = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "postgres",
  logging: false,
});

const dbConnection = async () => {
  try {
    await db.authenticate();
    console.log("successfully connected to postgres db!");
  } catch (err) {
    console.error("error connecting to postgres db", err);
  }
};

dbConnection();

module.exports = db;
