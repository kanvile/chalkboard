module.exports = (app) => {
  const isLogin = require('../middleware/auth')()

  const genCrudRoute = require('./crud')
  const { Assignment } = require('../models/assignment')
  const router = require('express').Router()

  genCrudRoute(router, Assignment)

  app.use('/assignments', isLogin, router)
}
