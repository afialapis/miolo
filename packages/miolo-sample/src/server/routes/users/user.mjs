import { db_password_change } from '#server/db/io/users/pwd.mjs'
import { db_user_save } from '#server/db/io/users/save.mjs'
import { generateRandomPassword } from '#server/utils/crypt.mjs'

export async function r_forgot(ctx, params) {
  const logger= ctx.miolo.logger
  
  const { email } = params

  const new_pwd= generateRandomPassword()
  let msg = await db_password_change(ctx.miolo, email, new_pwd)

  if (msg == undefined) {
    const emailer= ctx.miolo.emailer

    const mail= {
      'to'      : email,
      'subject' : 'miolo-sample: Nueva contraseña',
      'text'    : 
        `Tu nueva contraseña es: ${new_pwd}
         Por favor, inicia sesión con ella y, desde "Mi Cuenta", 
         cámbiala por una que vayas a recordar mejor.`
    }
  
    const info = await emailer.send(mail)
    if (info?.ok) {
      logger.info(`Reseted password for ${email}`)
    } 
  }

  return {
    success: msg === undefined,
    info: msg
  }
}


export async function r_change_password(ctx, params) {
  const logger= ctx.miolo.logger
  const { username, passwords } = params
  
  const {ok, msg} = await db_password_change(ctx.miolo, username, passwords)

  logger.info(`Changed password for ${username}`)

  if (!ok) {
    return {ok: false, error: msg}
  }

  return {ok: true, data: {msg}}
}

export async function r_user_save(ctx, params) {
  const res= await db_user_save(ctx.miolo, params)
  return res
}
