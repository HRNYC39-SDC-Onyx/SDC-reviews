const express = require('express')
const router = require('./routes.js')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/reviews', router)

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})