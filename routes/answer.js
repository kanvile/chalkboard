module.exports = (app) => {
  const isLogin = require('../middleware/auth')()

  const genCrudRoute = require('./crud')
  const { Answer } = require('../models/answer')
  const router = require('express').Router()

  genCrudRoute(router, Answer)

  app.use('/answers', isLogin, router)
}
