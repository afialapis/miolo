import {db_auth_user} from '#server/db/io/users/auth.mjs'
        

const local_auth_user = async (username, password, miolo) => {
  const [user, _msg] = await db_auth_user(miolo, username, password)

  return user
}

export default {
  basic: {
    auth_user: local_auth_user,
    realm: undefined, //'demo.app',
    paths: ['/crud'] // ['/api']
  }
}
