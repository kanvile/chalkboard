import { login } from './fetchers.js'

const form = document['admin-login-form']

const loginBtn = document.querySelector('.admin-login-btn')

loginBtn.addEventListener('click', async () => {
  const data = validateForm(form)

  if (data !== false) {
    await login({ ...data, type: 'admin' })

    alert('login successfully!')
    window.location = '/html/adminView.html'
  }
})

function validateForm(form) {
  const password = form.password.value
  const username = form.username.value
  const atposition = username.indexOf('@')
  const dotposition = username.lastIndexOf('.')

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
  }
}
