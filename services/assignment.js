const { Assignment } = require('../models/assignment')
const genCrudService = require('./crud')

module.exports = {
  ...genCrudService(Assignment, 'Assignment'),
}
