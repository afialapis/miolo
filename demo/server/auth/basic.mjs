
import {auth_user as q_auth_user} from '../db/users.mjs'


const local_auth_user = async (username, password, miolo) => {
  // auth=> done(null, user) 
  // noauth=> done(null, false, {message: ''}) 
  // err=> done(error, null)

  //console.log('[miolo-test-app][basic] local_auth_user()', username, password)

  const conn= miolo.db.getConnection()
  const user = await q_auth_user(conn, username, password)
  return user
}

export default {
  auth_user: local_auth_user,
  realm: undefined, //'demo.app',
  paths: ['/crud'] // ['/api']
}
