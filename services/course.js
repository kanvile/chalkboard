const { Course } = require('../models/course')
const genCrudService = require('./crud')
const GradeService = require('./grade')

const assert = require('http-assert')
const { USER_TYPE } = require('../constants')

const getCourses = async () => {
  const data = await Course.find({})
    .populate('students')
    .populate('instructors')
    .populate('materials')
    .populate('grades')
    .exec()
  return data
}

const getCourseById = async (id) => {
  const data = await Course.findById(id)
    .populate('students')
    .populate('instructors')
    .populate('materials')
    .populate('grades')
    .exec()
  return data
}

const createCourse = async (data, user) => {
  assert(user && user.type === USER_TYPE.instructor, 'Authentication failed')

  const course = Course.create({ ...data, instructors: [user.id] })
  return course
}

const enrollCourse = async (coursesId, studentId) => {
  await coursesId.reduce((p, c) => {
    return p.then(() => {
      return new Promise((resolve) => {
        async function enroll() {
          const course = await Course.findById(c)

          if (course.students.includes(studentId)) return

          await Course.findByIdAndUpdate(c, {
            students: [...course.students, studentId],
          })

          await GradeService.createGrade({ student: studentId, course: c })
        }

        enroll().then(() => resolve())
      })
    })
  }, Promise.resolve())

  return true
}

module.exports = {
  ...genCrudService(Course, 'Course'),
  createCourse,
  getCourses,
  getCourseById,
  enrollCourse,
}
