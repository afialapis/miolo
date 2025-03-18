import { v4 as uuidv4 } from 'uuid'

export let EMAIL_QUEUE = {}

export async function email_queue_an_email(email, logger= undefined) {
  const _loge = logger?.info || console.error

  try {
    const id = uuidv4()
    const emailData = { id, ...email, sent: false }
    //await client.rPush('email_queue', JSON.stringify(emailData))
    EMAIL_QUEUE[id] = emailData
    return { ok: true, id }

  } catch (error) {
    _loge(`[emailer] Error al guardar en la cola: ${error}`)
    return { ok: false, id: null, error }
  }
}
