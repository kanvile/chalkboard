const { User } = require('../models/user')

const getUserById = async (id) => {
  const user = await User.findById(id)
  return user
}

const getUserWithPassByUsername = async (username) => {
  const user = await User.findOne({ email: username })
    .select('+password')
    .exec()
  return user
}

const getAllUsers = async () => {
  const users = await User.find({})
  return users
}

const getUsersByType = async (type) => {
  const users = await User.find({ type })
  return users
}

const createUser = async (data) => {
  const user = await User.create(data)
  return user
}

const updateUser = async (id, data) => {
  await User.findByIdAndUpdate(id, data)
}

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id)
}

const deleteAllUsers = async () => {
  await User.deleteMany({})
}

module.exports = {
  getUserById,
  getUserWithPassByUsername,
  getAllUsers,
  getUsersByType,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
}
