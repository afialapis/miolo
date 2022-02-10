const {getConnection} = require('calustra')

function init_db_connection(config) {
  
  const conn= getConnection(config)

  return conn
}

export {init_db_connection}