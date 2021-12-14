const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId

const schema = new Schema({
  name: String,
  description: String,
  // each lesson includes multiple assignments
  assignments: [{ type: ObjectId, ref: 'Assignment' }],
})

module.exports = {
  Lesson: mongoose.model('Lesson', schema, 'lessons'),
  LessonSchema: schema,
}
