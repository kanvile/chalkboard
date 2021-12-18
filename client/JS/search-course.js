import { getCourseByName, getCourses } from './fetchers.js'
import { onClick } from './common.js'

getCourses().then((res) => {
  addCourse(res)
})

onClick(document.querySelector('.btn'), async () => {
  const name = document['search-course'].search.value

  const res = await getCourseByName(name)

  if (res) {
    addCourse([res])
  }
})

function addCourse(courses) {
  const studentId = JSON.parse(sessionStorage.getItem('user'))._id

  const html = courses.reduce((s, c) => {
    const alreadyIn = c.students.some((s) => s.id === studentId)

    let grade

    if (Array.isArray(c.grades) && c.grades.length > 0) {
      grade = c.grades.find((g) => g.student === studentId)
      console.log(grade)
    }

    s += `<tr scope="row">
      <td>${c.name}</td>
      <td>${c.identifier}</td>
      <td>${c.description}</td>
      <td>${c.capacity}</td>
      <td>${alreadyIn ? 'yes' : 'no'}</td>
      <td>${grade && grade.grades ? grade.grades : ''}</td>
    </tr>`

    return s
  }, '')

  document.querySelector('#table-body').innerHTML = html
}
