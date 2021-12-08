const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { USER_TYPE } = require('../constants')
const { Schema } = mongoose

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, alias: 'username', unique: true },
  password: {
    type: String,
    select: false,
    set: (v) => bcrypt.hashSync(v, 10),
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(USER_TYPE),
  },
})

schema.virtual('fullName', function getName() {
  return `${this.firstName} ${this.lastName}`
})

module.exports = {
  User: mongoose.model('User', schema, 'users'),
  UserSchema: schema,
}
