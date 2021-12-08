const assert = require('http-assert')
const { getUserWithPassByUsername, createUser } = require('./user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const verifyUser = async (data) => {
  const { username, password, type } = data
  validatePassword(password)

  const user = await getUserWithPassByUsername(username)
  assert(user !== null, 422, `User does not exist`)

  const isValid = bcrypt.compareSync(password, user.password)
  assert(isValid, 422, `Password is not correct for the username`)

  assert(type === user.type, 422, `User does not exist`)

  const token = genToken(user._id)

  return {
    user: filterUserInfo(user),
    token,
  }
}

const registerAndLogin = async (data) => {
  validatePassword(data.password)

  const _user = await getUserWithPassByUsername(data.email)
  assert(_user === null, 400, 'User already exists')

  const user = await createUser(data)

  return filterUserInfo(user)
}

const genToken = (id) => jwt.sign({ id }, process.env.SECRET)

const validatePassword = (password) => {
  const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,}$/.test(password)
  const message =
    'Password must contain at least six characters and it must contains at least one lowercase letter and one uppercase letter with numbers'

  assert(isValid, 422, message)
}

const filterUserInfo = (user) => {
  return {
    fullName: `${user.firstName} ${user.lastName}`,
    ...JSON.parse(JSON.stringify(user)),
    password: undefined,
  }
}

module.exports = { verifyUser, registerAndLogin, genToken }
