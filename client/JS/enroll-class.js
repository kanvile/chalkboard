import { getCourses, enrollCourse } from './fetchers.js'
import { onClick } from './common.js'

getCourses().then((res) => {
  if (!res || res.length === 0) {
    return
  }

  const user = JSON.parse(localStorage.getItem('user'))
  res = res.filter((c) => c.available && !c.students.includes(user.id))

  const html = res.reduce((s, c) => {
    s += `
          <input type="checkbox" id="${c.identifier}" name="${c.identifier}" />
          <label for="${c.identifier}">${c.name}</label><br />
         `
    return s
  }, '')

  const listForm = document.querySelector('.classlist')

  listForm.innerHTML = `${html}
        <button id="enroll" type="button">Enroll</button>
        <button id="cancel" type="reset">Cancel</button>
      `

  onClick(document.querySelector('#enroll'), async () => {
    let ids = []

    for (let i = 0; i < res.length; i++) {
      const cb = listForm[i]

      if (cb.checked) {
        ids.push(res.find((c) => c.identifier === cb.id).id)
      }
    }

    await enrollCourse(ids)

    alert('enroll successfully!')
  })
})
