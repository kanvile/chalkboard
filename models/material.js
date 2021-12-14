const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
  name: String,
  url: String,
})

module.exports = {
  Material: mongoose.model('Material', schema, 'materials'),
  MaterialSchema: schema,
}
