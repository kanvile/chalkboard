import { getCourses } from './fetchers.js'

getCourses().then((courses) => {
  const listContainer = document.querySelector('.adminList')

  const html = courses.reduce((p, c) => {
    p += `<div>
    <label><b>class id</b></label>
    <span>${c.identifier}</span>
    <label for="instructorname"><b>instructor</b></label>
    <select id="instructorname">
    ${c.instructors.reduce((s, ins) => {
      s += `<option>${ins.firstName} ${ins.lastName}</option>`
      return s
    }, '')}
    </select>
    <label for="students-list"><b>students</b></label>
    <select id="students-list">
    ${c.students.reduce((s, ins) => {
      s += `<option>${ins.firstName} ${ins.lastName}</option>`
      return s
    }, '')}
    </select>
    </div>`

    return p
  }, '')

  document.querySelector('.loading').remove()

  listContainer.innerHTML = html
})
