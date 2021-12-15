module.exports = (app) => {
  const isLogin = require('../middleware/auth')()

  const genCrudRoute = require('./crud')
  const router = require('express').Router()

  genCrudRoute(router, 'Grade')

  app.use('/grades', isLogin, router)
}
