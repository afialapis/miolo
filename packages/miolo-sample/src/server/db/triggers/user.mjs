
import { sha512 } from '#server/utils/crypt.mjs'


async function beforeInsertUser(conn, params, options) {

  const raw_pwd= params.password
  const cry_pwd=sha512(raw_pwd, process.env.MIOLO_SESSION_SALT)

  params.password= cry_pwd

  return [params, options, true]
}


export {beforeInsertUser}