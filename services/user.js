const { User } = require('../models/user')
const genCrudService = require('./crud')

const getUserWithPassByUsername = async (username) => {
  const user = await User.findOne({ email: username })
    .select('+password')
    .exec()
  return user
}

const getUsersByType = async (type) => {
  const users = await User.find({ type })
  return users
}

module.exports = {
  ...genCrudService(User, 'User'),
  getUserWithPassByUsername,
  getUsersByType,
}
