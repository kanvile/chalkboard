const { Grade } = require('../models/grade')
const genCrudService = require('./crud')

module.exports = {
  ...genCrudService(Grade, 'Grade'),
}
