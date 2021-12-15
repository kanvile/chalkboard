module.exports = (app) => {
  const isLogin = require('../middleware/auth')()

  const genCrudRoute = require('./crud')
  const router = require('express').Router()

  const { enrollCourse } = require('../services/course')

  genCrudRoute(router, 'Course')

  router.post('/enroll', async (req, res, next) => {
    try {
      await enrollCourse(req.body.courses, req.user.id)
      res.send(true)
    } catch (e) {
      next(e)
    }
  })

  app.use('/courses', isLogin, router)
}
