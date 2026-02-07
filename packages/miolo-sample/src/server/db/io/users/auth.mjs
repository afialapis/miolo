import { intre_now } from 'intre'
import { sha512 } from '#server/utils/crypt.mjs'

const _USER_FIELDS= 'id, username, name, email, active, last_login_date, last_login_ip, last_conn_at, login_count, admin'

const _USER_LAST_CONN_DELAY = 5 * 1000
let _USER_LAST_CONN_UPDATE = 0
const _should_update_user_last_conn = () => {
  const now = Math.floor(Date.now() / 1000)
  if (_USER_LAST_CONN_UPDATE + _USER_LAST_CONN_DELAY < now) {
    _USER_LAST_CONN_UPDATE = now
    return true
  }
  return false
}

export async function db_find_user_by_id(miolo, uid) {
  miolo.logger.silly(`[db_find_user_by_id] uid: ${uid}`)

  const conn= await miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const query = `
    SELECT ${_USER_FIELDS}
      FROM u_user
     WHERE id = $1`    

  const data= await conn.select(query, [uid], options) 

  if (data.length == 0) {
    return undefined
  }


  let user= undefined

  try {
    user= data[0]
    
    if (_should_update_user_last_conn()) {
      miolo.logger.silly(`[db_find_user_by_id] Updating ${user.name} last conn`)
      const qupd= 'UPDATE u_user SET last_conn_at = $1 WHERE id = $2'
      conn.execute(qupd, [intre_now(), uid])
    }
      
  } catch(e) {
    miolo.logger.error(`[db_find_user_by_id] Error ${e}`)
  }

  miolo.logger.silly(`[db_find_user_by_id] Found ${user.username}`)

  return user
}

export async function db_auth_user(miolo, username, password) {
  miolo.logger.debug(`[db_auth_user] authing: ${username}`)

  const conn= await miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  let data= undefined
  let msg= 'Credenciales incorrectas'

  const query = `
    SELECT id, password
      FROM u_user
     WHERE username = $1`
  
  const ruser= await conn.selectOne(query, [username], options) 

  if (ruser?.id == undefined) {
    msg= 'Usuario inexistente'
  } else {
    if (ruser?.password != sha512(password, process.env.MIOLO_SESSION_SALT)) {
      msg= 'Contraseña incorrecta'
    } else if (! isNaN(ruser?.id)) {

      data = await db_find_user_by_id(miolo, ruser.id)
      msg= undefined

      // update last conn
      miolo.logger.silly(`[db_auth_user] updating ${username} last* fields`)
      const ip = ''
      const log_count = data?.login_count || 0
      const qupd= 'UPDATE u_user SET last_conn_at = $1, last_login_date = $1, last_login_ip = $2, login_count = $3 WHERE id = $4'
      conn.execute(qupd, [intre_now(), ip, log_count + 1, ruser.id])
    }
  }

  miolo.logger.debug(`[db_auth_user] authing: ${username} => ${msg || 'ok'}`)

  return [data, msg]
}

