import { onClick } from './common.js'
import { getCourseById, updateGrade } from './fetchers.js'

const courseId = window.location.href.split('=')[1]

if (!courseId) {
  alert('Please choose specific course first!')
  history.back()
}

getCourseById(courseId).then((res) => {
  if (!res || res.students.length === 0) return

  const form = document['grade-form']
  const select = form['student-name']
  const grade = form['grade']
  const btn = form['submit']

  select.innerHTML = res.students.reduce((s, c) => {
    s += `<option value=${c._id}>${c.firstName} ${c.lastName}</option>`
    return s
  }, '')

  select.value = res.students[0]._id
  grade.value =
    res.grades.find((g) => g.student === res.students[0]._id).grades || ''

  select.addEventListener('change', (e) => {
    const studentId = e.target.value
    const v = res.grades.find((g) => g.student === studentId)

    grade.value = 100

    if (v) {
      grade.value = v.grades || ''
    }
  })

  onClick(btn, async () => {
    const grades = grade.value
    if (!grades || isNaN(grades)) {
      alert('Grades should be a number!')
      return
    }

    if (grades > 100) {
      alert('Grades should not bigger than 100!')
      return
    }

    const studentId = select.value
    const v = res.grades.find((g) => g.student === studentId)

    if (v) {
      await updateGrade(v._id, { grades })
      alert('grade successfully!')
      window.location.reload()
    }
  })
})
