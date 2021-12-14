const { Answer } = require('../models/answer')
const genCrudService = require('./crud')

module.exports = {
  ...genCrudService(Answer, 'Answer'),
}
