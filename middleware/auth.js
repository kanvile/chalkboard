const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const User = require('../models/user')
const { isValidObjectId } = require('mongoose')

module.exports = () => async (req, res, next) => {
  const token = String(req.headers.authorization || '')
    .split(' ')
    .pop()

  assert(token, 401, 'authentication failed')

  const { id } = jwt.verify(token, req.app.get('secret'))

  assert(isValidObjectId(id), 401, 'authentication failed')

  req.user = await User.findById(id)

  assert(req.user, 401, 'authentication failed')

  next()
}
