import { login } from './fetchers.js'

const form = document['login-form']

form.username.value = localStorage.username || ''
form.password.value = localStorage.password || ''
form['user-type'].value = localStorage.type || 'instructor'
form.remember.checked = JSON.parse(localStorage.remember || 'false')

const loginBtn = document.querySelector('.login-btn')

loginBtn.addEventListener('click', async () => {
  const data = validateForm(form)

  if (data !== false) {
    await login(data)

    const remember = form.remember.checked

    localStorage.setItem('username', remember ? data.username : '')
    localStorage.setItem('password', remember ? data.password : '')
    localStorage.setItem('type', remember ? data.type : 'instructor')
    localStorage.setItem('remember', remember)

    alert('login successfully!')
  }
})

function validateForm(form) {
  const password = form.password.value
  const username = form.username.value
  const atposition = username.indexOf('@')
  const dotposition = username.lastIndexOf('.')
  const type = form['user-type'].value

  let re

  if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= username.length
  ) {
    alert('Please enter a valid e-mail address!')
    return false
  }

  if (password.length < 6) {
    alert('Error: Password must contain at least six characters!')
    return false
  }

  re = /[0-9]/
  if (!re.test(password)) {
    alert('Error: password must contain at least one number (0-9)!')
    return false
  }
  re = /[a-z]/
  if (!re.test(password)) {
    alert('Error: password must contain at least one lowercase letter (a-z)!')
    return false
  }
  re = /[A-Z]/
  if (!re.test(password)) {
    alert('Error: password must contain at least one uppercase letter (A-Z)!')
    return false
  }

  return {
    username,
    password,
    type,
  }
}
