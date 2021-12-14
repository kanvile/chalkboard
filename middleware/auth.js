const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const { getUserById } = require('../services/user')
const { isValidObjectId } = require('mongoose')

module.exports = (userType) => async (req, res, next) => {
  const token = String(req.headers.authorization || '')
    .split(' ')
    .pop()

  try {
    assert(token, 401, 'Authentication failed')

    const { id } = jwt.verify(token, req.app.get('secret'))

    assert(isValidObjectId(id), 401, 'Authentication failed')

    const user = await getUserById(id)

    console.log('auth middleware', user)

    assert(
      user !== null && (!userType || user.type === userType),
      401,
      'Authentication failed'
    )

    req.user = user
    next()
  } catch (e) {
    next(e)
  }
}
