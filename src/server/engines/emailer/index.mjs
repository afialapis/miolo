import nodemailer from 'nodemailer'

function init_emailer(options, defaults, silent= false) {

  const nmailer = nodemailer.createTransport(options, defaults)

  async function send_email(mail) {
    if (silent) {
      console.info('*********************************')
      console.info('This mail will not be send (emailing is disabled):')
      console.info(mail)
      console.info('*********************************')
    } else {
      try {
        let info = nmailer.sendMail(mail)
        info.ok = info?.messageId ? true : false

        return info
      } catch(error) {
        return {
          error,
          ok: false
        }
      }
    }
  }


  function verify_emailer() {
    console.info('[miolo][Verify][MAILER] Verifying...')
    // verify connection configuration
    nmailer.verify(function(error, _success) {
      if (error) {
          console.error('[miolo][Verify][MAILER] Verifying ERROR')
          console.error(error)
      } else {
          console.info('[miolo][Verify][MAILER] Verifyed OK: Server is ready to take our messages')
          //test_eail()
      }
    })
  }

  const emailer= {
    send: send_email, 
    verify: verify_emailer,
    options, 
    defaults, 
    silent
  }
  return emailer
}




export {init_emailer}