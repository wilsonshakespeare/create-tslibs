
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./__MODULE__.cjs.production.min.js')
} else {
  module.exports = require('./__MODULE__.cjs.development.js')
}
