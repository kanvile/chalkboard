const { Grade } = require('../models/grade')
const genCrudService = require('./crud')

const getGradeByCourseId = async (id) => {
  const grade = await Grade.findOne({ course: id })

  return grade
}

const updateGradeById = async (id, data, instructor) => {
  await Grade.findByIdAndUpdate(id, { ...data, instructor: instructor._id })
  return true
}

module.exports = {
  ...genCrudService(Grade, 'Grade'),
  getGradeByCourseId,
  updateGradeById,
}
