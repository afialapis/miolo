
import {auth_user as q_auth_user} from '../db/io/users.mjs'


const local_auth_user = async (username, password, miolo) => {
  // auth=> done(null, user) 
  // noauth=> done(null, false, {message: ''}) 
  // err=> done(error, null)

  console.log('[miolo-demo][basic] local_auth_user()', username, password)

  const conn= miolo.db.getConnection()
  const user = await q_auth_user(conn, username, password)
  return user
}

export default {
  auth_user: local_auth_user,
  realm: undefined, //'demo.app',
  paths: undefined // ['/api']
}
