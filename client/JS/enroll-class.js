import { getCourses, enrollCourse } from './fetchers.js'
import { onClick } from './common.js'

const p = new Promise((r) => {
  setTimeout(() => r(true), 2000)
})

async function f() {
  const res = await p

  console.log(res)
}

f()

getCourses().then((res) => {
  if (!res || res.length === 0) {
    return
  }

  const user = JSON.parse(localStorage.getItem('user'))
  res = res.filter(
    (c) =>
      c.available &&
      (c.students.length === 0 || c.students.every((s) => s.id !== user.id))
  )

  if (res.length === 0) return

  const html = res.reduce((s, c) => {
    s += `
          <input disable="true" type="checkbox" id="${c.identifier}" name="${c.identifier}" />
          <label id="label-${c.identifier}" for="${c.identifier}">${c.name}</label><br />
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
    let checkedList = []

    for (let i = 0; i < res.length; i++) {
      const cb = listForm[i]

      if (cb.checked) {
        checkedList.push(cb.id)
        ids.push(res.find((c) => c.identifier === cb.id).id)
      }
    }

    if (ids.length === 0) return

    await enrollCourse(ids)

    checkedList.forEach((id) => {
      document.querySelector(`#${id}`).remove()
      document.querySelector(`#label-${id}`).remove()
    })

    alert('enroll successfully!')
  })
})
