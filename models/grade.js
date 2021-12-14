const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId

const schema = new Schema({
  student: { type: ObjectId, ref: 'User' },
  instructor: { type: ObjectId, ref: 'User' },
  lesson: { type: ObjectId, ref: 'Lesson' },
  grades: Number,
  feedback: String,
})

module.exports = {
  Grade: mongoose.model('Grade', schema, 'grades'),
  GradeSchema: schema,
}
