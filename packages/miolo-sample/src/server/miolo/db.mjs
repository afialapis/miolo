// import path from 'path'
// import {fileURLToPath} from 'url'
import {beforeInsertUser} from '#server/db/triggers/user.mjs'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

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
  options: {
    tables: TABLES
  }
}