const {getConnection} = require('calustra-conn')

function init_db_connection(config) {
  
  const conn= getConnection(config.connection, config.options)

  return conn
}

export {init_db_connection}