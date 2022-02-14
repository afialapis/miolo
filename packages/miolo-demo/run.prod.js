process.env.NODE_ENV = 'production'

const compileProd= require('./src/config/webpack.prod.js')

console.log('[miolo-demo] Server compiling...')

compileProd(() => {
  console.log('[miolo-demo] Server running...')
  require('./src/server')
})


