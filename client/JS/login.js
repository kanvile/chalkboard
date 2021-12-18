import { login } from './fetchers.js'
import { validate } from './common.js'

const form = document['login-form']
const loginBtn = document.querySelector('.login-btn')

const init = () => {
  form.username.value = sessionStorage.username || ''
  form.password.value = sessionStorage.password || ''
  form['user-type'].value = sessionStorage.type || 'instructor'
  form.remember.checked = JSON.parse(sessionStorage.remember || 'false')
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
    ing = false
    return
  }

  try {
    await login(data)
  } catch {
    loginBtn.textContent = 'login'
    ing = false
    return
  }

  const remember = form.remember.checked

  sessionStorage.setItem('username', remember ? data.username : '')
  sessionStorage.setItem('password', remember ? data.password : '')
  sessionStorage.setItem('type', remember ? data.type : 'instructor')
  sessionStorage.setItem('remember', remember)
  loginBtn.textContent = 'login'

  const route = `/html/${
    data.type === 'student' ? 'search' : 'displayclasses'
  }.html`

  window.location = route
})
