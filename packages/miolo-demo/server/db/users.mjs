
import { sha512 } from '#server/utils/crypt.mjs'

async function find_user_by_id(miolo, uid) {
  // TODO : handle transactions
  const options= {transaction: undefined}
  const conn= await miolo.db.get_connection()
  const query = `
    SELECT id, username, name, created_at
      FROM u_user
     WHERE id = $1`
  
  const data= await conn.select(query, [uid], options) 
  try {
    return data[0]
  } catch(e) {
    return undefined
  }
}

async function local_auth_user(miolo, username, password) {
  // TODO : handle transactions
  const options= {transaction: undefined}
  const conn= await miolo.db.get_connection()

  const query = `
    SELECT id, username, name, created_at
      FROM u_user
     WHERE username = $1
       AND password = $2`;

  const data= await conn.select(query, [username, sha512(password, process.env.MIOLO_SESSION_SALT)], options) 

  console.log(data)


  try {
    return [data[0], undefined]
  } catch(e) {
    return [undefined, 'User not found']
  }  
}

export {find_user_by_id, local_auth_user}
