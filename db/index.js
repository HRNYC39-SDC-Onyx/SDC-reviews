const { Pool, Client } = require('pg')
const { user, host, database, password, port } = require('../config.js')

const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
})

pool.query('SELECT NOW()', (err, res) => {
  err ? console.log('error connecting to postgres db') : console.log('succesfully connected to postgres db!')
  pool.end()
})

const client = new Client({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
})

client.connect()
client.query('SELECT NOW()', (err, res) => {
  err ? console.log('error connecting to postgres db') : console.log('succesfully connected to postgres db!')
  client.end()
})