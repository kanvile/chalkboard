module.exports = (app) => {
  const router = require('express').Router()

  const { USER_TYPE } = require('../constants')
  const isAdmin = require('../middleware/auth')(USER_TYPE.admin)

  const genCrudRoute = require('./crud')
  const { getUsersByType } = require('../services/user')

  genCrudRoute(router, 'User', ['create'])

  router.get('/type/:type', async (req, res, next) => {
    const type = req.params.type

    try {
      const users = await getUsersByType(type)
      res.json(users)
    } catch (e) {
      next(e)
    }
  })

  // app.use('/users', isAdmin, router)
  app.use('/users', router)
}
