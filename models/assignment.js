const mongoose = require('mongoose')
const { Schema } = mongoose
const { AnswerSchema } = require('./answer')
const ObjectId = Schema.Types.ObjectId

const schema = new Schema({
  title: String,
  // each assignment includes multiple answers created by student
  answers: [{ type: ObjectId, ref: 'Answer' }],
  deadline: Date,
})

module.exports = {
  Assignment: mongoose.model('Assignment', schema, 'assignments'),
  AssignmentSchema: schema,
}
