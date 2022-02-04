// Enable ES2018 support
require('@babel/register')

// Ignore files on server render
// require.extensions['.scss'] = function() {
//   return
// }

require('./server')
