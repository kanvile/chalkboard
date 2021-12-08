import { register } from './fetchers.js'

const signUpBtn = document.querySelector('.signup-btn')
signUpBtn.addEventListener('click', async () => {
  const data = validateForm(document['signup-form'])
  await register(data)

  alert('signup successfully!')

  window.location = '/'
})

function validateForm(form) {
  const pwd = form.psw.value
  const pwd2 = form.psw2.value
  const email = form.email.value
  const atposition = email.indexOf('@')
  const dotposition = email.lastIndexOf('.')
  const first = form.firstName.value
  const second = form.lastName.value
  const type = form['user-type'].value

  let re

  if (first == ' ' || second == ' ') {
    alert("Name can't be blank")
    return false
  }
  if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= email.length
  ) {
    alert('Please enter a valid e-mail address!')
    return false
  }
  if (pwd != pwd2) {
    alert('Error: Password must be same!')
    return false
  }
  if (pwd.length < 6) {
    alert('Error: Password must contain at least six characters!')
    return false
  }
  re = /[0-9]/
  if (!re.test(pwd)) {
    alert('Error: password must contain at least one number (0-9)!')
    return false
  }
  re = /[a-z]/
  if (!re.test(pwd)) {
    alert('Error: password must contain at least one lowercase letter (a-z)!')
    return false
  }
  re = /[A-Z]/
  if (!re.test(pwd)) {
    alert('Error: password must contain at least one uppercase letter (A-Z)!')
    return false
  }

  return {
    password: pwd,
    email,
    firstName: first,
    lastName: second,
    type,
  }
}
