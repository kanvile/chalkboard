const { join } = require('path')

require('cpx2').watch(
  join(__dirname, 'client/js/*.js'),
  join(__dirname, 'client/html')
)
