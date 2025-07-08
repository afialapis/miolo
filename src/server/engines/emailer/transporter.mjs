import nodemailer from 'nodemailer'
import { email_queue_an_email, email_queue_pop_pendings, email_queue_remove_ids } from './queue.mjs'


const _logi = (logger, msg) => logger?.info ? logger.info(msg) : console.info(msg)
const _loge = (logger, msg) => logger?.error ? logger.info(msg) : console.error(msg)


export function _init_emailer_transporter({options, defaults, silent}) {

  const nmailer = nodemailer.createTransport(options, defaults)

  function verify_emailer(logger= undefined) {
    _logi(logger, '[emailer] Verifying...')
    nmailer.verify(function(error, _success) {
      if (error) {
        _loge(logger, '[emailer] Verifying ERROR')
        _loge(logger, error)
      } else {
        _logi(logger, '[emailer] Verifyed OK: Server is ready to take our messages')
      }
    })
  }

  async function send_email(mail, logger= undefined) {
    if (silent === true) {
      _logi(logger, '[emailer] *********************************')
      _logi(logger, '[emailer] This mail will not be send (emailing is disabled):')
      _logi(logger, mail)
      _logi(logger, '[emailer] *********************************')

      return {
        ok: true,
        silent: true,
        error: undefined,
        messageId: undefined
      }
    } else {
      try {
        let info = await nmailer.sendMail(mail)
        info.ok = info?.messageId ? true : false

        return info
      } catch(error) {
        _loge(logger, `[emailer] Error sending email: ${mail?.from || ''} => ${mail?.to || ''} (${mail?.subject || ''})`)

        return {
          ok: false,
          silent: false,
          error,
          messageId: undefined
        }
      }
    }
  }

  function queue_email(mail, logger= undefined) {
    if (silent === true) {
      _logi(logger, '[emailer] *********************************')
      _logi(logger, '[emailer] This mail will not be send (emailing is disabled):')
      _logi(logger, mail)
      _logi(logger, '[emailer] *********************************')

      return {
        ok: true,
        silent: true,
        error: undefined,
        messageId: undefined
      }
    } else {
      try {
        const q = email_queue_an_email(mail, logger)
        _logi(logger, `[emailer] Queued email: ${mail?.from || ''} => ${mail?.to || ''} (${mail?.subject || ''})`)

        return {
          ok: q.ok,
          silent: false,
          error: q.error,
          messageId: q.id
        }
      } catch(error) {
        _loge(logger, `[emailer] Error queueing email: ${mail?.from || ''} => ${mail?.to || ''} (${mail?.subject || ''})`)

        return {
          ok: false,
          silent: false,
          error,
          messageId: undefined
        }
      }
    }
  }

  async function queue_send_emails(logger= undefined) {
    const pending = email_queue_pop_pendings(logger)
    if (pending.length <= 0) {
      return
    }
    _logi(logger, `[emailer] Sending emails queue (${pending.length} emails)`)
  
    // const emailString = await client.lPop('email_queue')
    // if (!emailString) break
    // const email = JSON.parse(emailString)
  
    for (const email of pending) {
      if (email.count > 1) {
        _logi(logger, `[emailer] Sending queued and stacked email [${email.subject}](x${email.count})...`)
        email.subject = `${email.subject} (x${email.count})`
      } else {
        _logi(logger, `[emailer] Sending queued email [${email.subject}]...`)
      }

      send_email(email).then((res) => {
        _logi(logger, `[emailer] Queued email [${email.subject}]sent ${res.ok ? 'OK' : 'NOT OK'}`)
        if (res.ok) {
          delete email_queue_remove_ids(email.ids, logger)
        }
      })
    }
    _logi(logger, `[emailer] Sent emails ${pending.length} from queue`)
  }
  
  const emailer= {
    send: send_email, 
    verify: verify_emailer,
    queue_email,
    queue_send_emails,
    options, 
    defaults, 
    silent
  }
  return emailer
}



let _cache = {}

export function init_emailer_transporter({options, defaults, silent}, logger= undefined) {

  const ckey = JSON.stringify({options, defaults, silent})
  if (ckey in _cache) {
    return _cache[ckey]
  }

  _cache[ckey] = _init_emailer_transporter({options, defaults, silent}, logger) 
  return _cache[ckey]

}
