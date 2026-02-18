
import {local_auth_user as q_local_auth_user} from '#server/db/users.mjs'


const local_auth_user = async (username, password, miolo) => {
  // auth=> done(null, user) 
  // noauth=> done(null, false, {message: ''}) 
  // err=> done(error, null)

  //console.log('[miolo-demo][basic] local_auth_user()', username, password)

  const [user, msg] = await q_local_auth_user(miolo, username, password)
  return user
}

export default {
  auth_user: local_auth_user,
  realm: undefined, //'demo.app',
  paths: ['/crud'] // ['/api']
}
