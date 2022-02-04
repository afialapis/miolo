process.env.NODE_ENV = 'production'

const compileProd= require('./src/config/webpack.prod.js')

console.log('[PROD] Server compiling...')

compileProd(() => {
  console.log('[PROD] Server running...')
  require('./src/server')
})


