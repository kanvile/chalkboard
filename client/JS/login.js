import { login } from './fetchers.js'
import { validate } from './validator.js'

const form = document['login-form']
const loginBtn = document.querySelector('.login-btn')

const init = () => {
  form.username.value = localStorage.username || ''
  form.password.value = localStorage.password || ''
  form['user-type'].value = localStorage.type || 'instructor'
  form.remember.checked = JSON.parse(localStorage.remember || 'false')
}

init()

let ing = false

loginBtn.addEventListener('click', async () => {
  if (ing) return
  ing = true

  loginBtn.textContent = 'login...'

  const data = {
    username: form.username.value,
    password: form.password.value,
    type: form['user-type'].value,
  }

  if (!validate(data)) {
    loginBtn.textContent = 'login'
    return
  }

  await login(data)

  const remember = form.remember.checked

  localStorage.setItem('username', remember ? data.username : '')
  localStorage.setItem('password', remember ? data.password : '')
  localStorage.setItem('type', remember ? data.type : 'instructor')
  localStorage.setItem('remember', remember)
  loginBtn.textContent = 'login'

  const route = `/html/${
    data.type === 'student' ? 'search' : 'displayclasses'
  }.html`

  window.location = route
})
