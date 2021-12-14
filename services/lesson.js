const { Lesson } = require('../models/lesson')
const genCrudService = require('./crud')

module.exports = {
  ...genCrudService(Lesson, 'Lesson'),
}
