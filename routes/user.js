const {
  getAllUsers,
  getUsersByType,
  updateUser,
  deleteUser,
  deleteAllUsers,
} = require('../services/user')

module.exports = (app) => {
  const router = require('express').Router()

  router.get('/', async (req, res, next) => {
    try {
      const users = await getAllUsers()
      res.json(users)
    } catch (e) {
      next(e)
    }
  })

  router.get('/:type', async (req, res, next) => {
    const type = req.params.type

    try {
      const users = await getUsersByType(type)
      res.json(users)
    } catch (e) {
      next(e)
    }
  })

  router.patch('/:id', async (req, res, next) => {
    const id = req.params.id
    const data = req.body

    try {
      const user = await updateUser(id, data)
      res.json(user)
    } catch (e) {
      next(e)
    }
  })

  router.delete('/:id', async (req, res, next) => {
    const id = req.params.id

    try {
      await deleteUser(id)
      res.json(true)
    } catch (e) {
      next(e)
    }
  })

  router.delete('/', async (req, res, next) => {
    try {
      await deleteAllUsers()
      res.json(true)
    } catch (e) {
      next(e)
    }
  })

  app.use('/users', router)
}
