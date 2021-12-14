const mongoose = require('mongoose')
const { Schema } = mongoose
const { MaterialSchema } = require('./material')
const ObjectId = Schema.Types.ObjectId

const schema = new Schema({
  text: String,
  student: { type: ObjectId, ref: 'user' },
  materials: { type: [MaterialSchema] },
})

module.exports = {
  Answer: mongoose.model('Answer', schema, 'answers'),
  AnswerSchema: schema,
}
