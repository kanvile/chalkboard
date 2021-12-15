module.exports = (app) => {
  const isLogin = require('../middleware/auth')()

  const genCrudRoute = require('./crud')
  const router = require('express').Router()

  genCrudRoute(router, 'AnSwer')

  app.use('/answers', isLogin, router)
}
