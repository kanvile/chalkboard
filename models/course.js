const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId

const schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    students: [{ type: ObjectId, ref: 'User' }],
    instructors: [{ type: ObjectId, ref: 'User' }],
    // each course includes multiple lessons
    lessons: [{ type: ObjectId, ref: 'Lesson' }],
    materials: [{ type: ObjectId, ref: 'Material' }],
    capacity: { type: Number, required: true },
    identifier: { type: String, unique: true, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

schema.virtual('grades', {
  localField: '_id',
  ref: 'Grade',
  foreignField: 'course',
})

schema.virtual('available').get(function () {
  return this.students.length < this.capacity
})

module.exports = {
  Course: mongoose.model('Course', schema, 'courses'),
  CourseSchema: schema,
}
