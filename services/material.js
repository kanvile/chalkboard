const { Material } = require('../models/material')
const genCrudService = require('./crud')

module.exports = {
  ...genCrudService(Material, 'Material'),
}
