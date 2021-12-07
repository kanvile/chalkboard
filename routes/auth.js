const { verifyUser, registerAndLogin } = require('../services/auth')

module.exports = (app) => {
  app.post('/login', async (req, res, next) => {
    try {
      const userAndToken = await verifyUser(req.body)
      res.json(userAndToken)
    } catch (e) {
      next(e)
    }
  })

  app.post('/register', async (req, res, next) => {
    try {
      const user = await registerAndLogin(req.body)
      res.json(user)
    } catch (e) {
      next(e)
    }
  })
}
