const { Course } = require('../models/course')
const genCrudService = require('./crud')

const enrollCourse = async (coursesId, userId) => {
  await coursesId.reduce((p, c) => {
    p.then(() => {
      return new Promise((resolve) => {
        Course.findById(c).then((res) => {
          Course.findByIdAndUpdate(c, {
            students: [...res.students, userId],
          }).then(() => {
            resolve()
          })
        })
      })
    })
  }, Promise.resolve())

  return true
}

module.exports = {
  ...genCrudService(Course, 'Course'),
  enrollCourse,
}
