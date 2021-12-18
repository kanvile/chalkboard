import { getCourses, enrollCourse } from './fetchers.js'

let ing = false

getCourses().then((res) => {
  if (!res || res.length === 0) {
    return
  }

  const user = JSON.parse(sessionStorage.getItem('user'))
  res = res.filter(
    (c) =>
      c.available &&
      (c.students.length === 0 || c.students.every((s) => s.id !== user.id))
  )

  if (res.length === 0) return

  const html = res.reduce((s, c) => {
    s += `
          <input disable="true" type="checkbox" id="check-${c.identifier}" name="${c.identifier}" />
          <label id="label-check-${c.identifier}" for="${c.identifier}">${c.name}</label><br />
         `
    return s
  }, '')

  const listForm = document.querySelector('.classlist')

  listForm.innerHTML = `${html}
        <button id="enroll" type="button">Enroll</button>
        <button id="cancel" type="reset">Cancel</button>
      `

  const submitBtn = document.querySelector('#enroll')

  const courses = res
  submitBtn.addEventListener('click', async () => {
    if (ing) return

    ing = true
    submitBtn.textContent = 'loading...'

    let ids = []
    let checkedList = []

    for (let i = 0; i < courses.length; i++) {
      const cb = listForm[i]

      if (cb.checked) {
        checkedList.push(cb.id)
        ids.push(courses.find((c) => `check-${c.identifier}` === cb.id).id)
      }
    }

    if (ids.length === 0) {
      alert('Please choose course first!')

      ing = false
      submitBtn.textContent = 'enroll'
      return
    }

    const res = await enrollCourse(ids)

    if (res) {
      alert('enroll successfully!')

      checkedList.forEach((id) => {
        document.querySelector(`#${id}`).remove()
        document.querySelector(`#label-${id}`).remove()
      })
    }

    ing = false
    submitBtn.textContent = 'enroll'
  })
})
