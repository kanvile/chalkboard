import { login } from './fetchers.js'
import { validate } from './common.js'

const form = document['admin-login-form']
const loginBtn = document.querySelector('.admin-login-btn')

let ing = false

loginBtn.addEventListener('click', async () => {
  if (ing) return
  ing = true

  loginBtn.textContent = 'login...'

  const data = {
    username: form.username.value,
    password: form.password.value,
    type: 'admin',
  }

  if (!validate(data)) {
    loginBtn.textContent = 'login'
    ing = false
    return
  }

  try {
    await login({ ...data, type: 'admin' })
  } catch {
    loginBtn.textContent = 'login'
    ing = false
    return
  }

  window.location = '/html/adminView.html'
})
