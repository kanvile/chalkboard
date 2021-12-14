import { createCourse } from './fetchers.js'
import { onClick } from './common.js'

const form = document['add-class-form']
const btn = document.querySelector('#submit')

onClick(btn, async () => {
  const name = form.name.value
  const id = form.id.value
  const capacity = form.capacity.value
  const description = form.description.value

  const data = {
    identifier: id,
    name,
    description,
    capacity: parseInt(capacity),
  }

  if (!validate(data)) {
    return
  }

  await createCourse(data)

  alert('add class successfully!')

  window.location = '/html/displayclasses.html'
})

function validate({ identifier, name, description, capacity }) {
  let msg = ''
  if (!identifier) {
    msg = 'id required'
  }

  if (!name) {
    msg = 'name required'
  }

  if (!description) {
    msg = 'description required'
  }

  if (isNaN(capacity)) {
    msg = 'capacity required'
  }

  if (msg) {
    alert(msg)
    return false
  }

  return true
}
