const { Sequelize } = require('sequelize')
const { host, port, database } = require('../config.js')

const db = new Sequelize(`postgres://${host}:${port}/${database}`)

const dbConnection = async () => {
  try {
    await db.authenticate()
    console.log('successfully connected to postgres db!')
  } catch (err) {
    console.error('error connecting to postgres db', err)
  }
}

dbConnection()

module.exports = db