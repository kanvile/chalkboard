export function validate(fields) {
  const { username, password } = fields

  const atPosition = username.indexOf('@')
  const dotPosition = username.lastIndexOf('.')

  let regexp
  let msg

  if (
    atPosition < 1 ||
    dotPosition < atPosition + 2 ||
    dotPosition + 2 >= username.length
  ) {
    msg = 'Please enter a valid e-mail address!'
  }

  if (password.length < 6) {
    msg = 'Password must contain at least six characters!'
  }

  regexp = /[0-9]/
  if (!regexp.test(password)) {
    msg = 'password must contain at least one number (0-9)!'
  }

  regexp = /[a-z]/
  if (!regexp.test(password)) {
    msg = 'password must contain at least one lowercase letter (a-z)!'
  }

  regexp = /[A-Z]/
  if (!regexp.test(password)) {
    msg = 'password must contain at least one uppercase letter (A-Z)!'
  }

  if (msg) {
    alert(msg)
    return false
  }

  return true
}
