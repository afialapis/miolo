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
    dialect:  'sqlite',
    // host:     process.env.IS_DOCKER === "true" ? 'postgres' : 'localhost',
    port:     5432,
    filename: path.join(__dirname, '../../../db/miolo-sample.db'),
    //user:     'postgres',
    //password: 'postgres',
    //max:      5,          // Maximum number of connection in pool
    //min:      0,          // Minimum number of connection in pool
    //idleTimeoutMillis: 10000,  // The maximum time, in milliseconds, that a connection can be idle before being released. Use with combination of evict for proper working, for more details read https://github.com/coopernurse/node-pool/issues/178#issuecomment-327110870,
  }, 
  options: {
    tables: TABLES
  }
}