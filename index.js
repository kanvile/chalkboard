require('dotenv').config()
const express = require('express')
const compression = require('compression')
const app = express()
const { join } = require('path')

app.set('secret', process.env.SECRET)
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(compression())

app.use('/', express.static(join(__dirname, 'client')))

app.get('/', (req, res) => {
  res.redirect('/html/index.html')
})

require('require-all')({
  dirname: __dirname + '/routes',
  filter: /\.js$/,
  resolve: function (route) {
    route(app)
  },
})

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json(err.message || 'Internet Error')
})

app.use((req, res) => {
  res.sendStatus(404)
})

require('./plugins/db')()

const port = process.env.PORT
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
