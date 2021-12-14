module.exports = (app) => {
  const isLogin = require('../middleware/auth')()

  const genCrudRoute = require('./crud')
  const { Lesson } = require('../models/lesson')
  const router = require('express').Router()

  genCrudRoute(router, Lesson)

  app.use('/lessons', isLogin, router)
}
