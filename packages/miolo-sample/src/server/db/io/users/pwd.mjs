import { sha512 } from '#server/utils/crypt.mjs'

export async function db_password_change(miolo, email, passwords) {
  const conn= await miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  let ok = false
  let msg= 'Credenciales incorrectas'

  let query = `
    SELECT id, password
      FROM u_user
     WHERE username = $1 OR email = $1`
  
  const data= await conn.selectOne(query, [email], options) 

  if (isNaN(data?.id)) {
    msg= 'Usuario inexistente'
  } else {

    if (data?.password != sha512(passwords.current, process.env.MIOLO_SESSION_SALT)) {
      msg= 'Contraseña actual incorrecta'
    } else {
      try {
        query= 'UPDATE u_user SET password = $1 WHERE id = $2'
        const pwd=sha512(passwords.new, process.env.MIOLO_SESSION_SALT)
        await conn.execute(query, [pwd, data.id])   

        msg= 'Contraseña modificada correctamente'
        ok= true     
      } catch (err) {
        msg= `Error al modificar la contraseña: ${err}`
      }
    }

  }

  return {ok, msg}
}
