console.log('[miolo-demo] building client...')

process.env.NODE_ENV = 'development'
require('./src/config/webpack.dev.js')

console.log('[miolo-demo] running server...')
require('./src/server')

