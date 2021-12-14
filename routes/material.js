module.exports = (app) => {
  const isLogin = require('../middleware/auth')()

  const genCrudRoute = require('./crud')
  const { Material } = require('../models/material')
  const router = require('express').Router()

  genCrudRoute(router, Material)

  app.use('/materials', isLogin, router)
}
