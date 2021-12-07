const { join } = require('path')

require('cpx2').copySync(
  join(__dirname, 'client/js/*.js'),
  join(__dirname, 'client/html')
)
