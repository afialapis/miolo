const merge = require('assign-deep')
const config = require('./server.base.js')


// Merge with base configuration
module.exports= merge(config, {
  server: {
    DEV: false,
  },
  log: {
    level: 'debug',
    format: {
      locale: 'es'
    },
    console: {
      enabled: true,
      level: 'silly',
    },
    file: {
      enabled: true,
      level: 'debug',
      filename: '/var/log/miolo.log'
    },
    mail: {
      enabled: true,
      level: 'warn',
      name: 'miolo',
      from: 'bonafide@afialapis.com',
      to: 'devel@afialapis.com'      
    }  
  }
})
