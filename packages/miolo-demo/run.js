process.env.NODE_ENV = 'development'

const compileDev= require('./src/config/webpack.dev.js')

console.log('[miolo-demo] Server compiling...')

compileDev(() => {
  console.log('[miolo-demo] Server running...')
  require('./src/server')
})



