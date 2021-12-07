const mongoose = require('mongoose')
const { Schema } = mongoose
const { UserSchema } = require('./user')

const schema = new Schema({
  name: String,
  students: [UserSchema],
  description: String,
  index: { type: [String], index: true },
  createAt: { type: Date, default: new Date() },
})

module.exports = {
  Class: mongoose.model('class', schema, 'classes'),
  ClassSchema: schema,
}
