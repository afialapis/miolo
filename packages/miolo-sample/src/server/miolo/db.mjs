import path from 'path'
import {fileURLToPath} from 'url'
import {beforeInsertUser} from '#server/db/triggers/user.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Only for CRUD routes!
const useUserFields = {
  use: true,
  fieldNames: {
    created_by: 'created_by', 
    last_update_by: 'last_update_by'
  }
}

const TABLES = [  
  {
    name: 'u_user',
    useDateFields: true,
    triggers: {
      beforeInsert: beforeInsertUser
    }
  },
  {
    name: 'todo',
    useDateFields: true,
    useUserFields,
  },
]

export default {
  config: {
    dialect:  process.env.MIOLO_DB_DIALECT,
    database: process.env.MIOLO_DB_NAME,
    host:     process.env.IS_DOCKER === "true" ? process.env.MIOLO_DB_DOCKER_HOST  : process.env.MIOLO_DB_HOST ,
    port:     process.env.MIOLO_DB_PORT,
    user:     process.env.MIOLO_DB_USER,
    password: process.env.MIOLO_DB_PASSWORD,
    max:      process.env.MIOLO_DB_POOL_MAX, // Maximum number of connection in pool
    min:      process.env.MIOLO_DB_POOL_MIN, // Minimum number of connection in pool
    idleTimeoutMillis: process.env.MIOLO_DB_POOL_IDLE_TIMEOUT_MS,  // The maximum time, in milliseconds, that a connection can be idle before being released. Use with combination of evict for proper working, for more details read https://github.com/coopernurse/node-pool/issues/178#issuecomment-327110870,
  }, 
  options: {
    tables: TABLES
  }
}