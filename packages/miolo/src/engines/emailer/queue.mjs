import { v4 as uuidv4 } from "uuid"

export const EMAIL_QUEUE = {}

export async function email_queue_an_email(email, logger = undefined) {
  const _loge = logger?.error || console.error

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

export function email_queue_pop_pendings(logger = undefined) {
  const grouped = {}

  Object.values(EMAIL_QUEUE)
    .filter((e) => !e.sent)
    .forEach(({ id: eid, from, to, subject, text, html }) => {
      const key = `${from}_${to}_${subject}`

      if (!grouped[key]) {
        grouped[key] = { to_subject_key: key, from, to, subject, text, html, count: 0, ids: [] }
      }

      grouped[key].count++
      grouped[key].ids.push(eid)

      // Mark as sent
      try {
        EMAIL_QUEUE[eid].sent = true
      } catch (_) {}
    })

  return Object.values(grouped)
}

export function email_queue_remove_ids(eids, logger = undefined) {
  eids.forEach((eid) => {
    delete EMAIL_QUEUE[eid]
  })
}
