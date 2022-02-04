const nodemailer = require('nodemailer')

function init_emailer(options, defaults, silent= false) {


  const nmailer = nodemailer.createTransport(options, defaults)

  function send_email(mail, cb) {
    if (process.env.NODE_ENV != 'production') {
      console.info('*********************************')
      console.info('This mail would be sent if you were in production:')
      console.info(mail)
      console.info('*********************************')
    } else if (silent) {
      console.info('*********************************')
      console.info('This mail will not be send (emailing is disabled):')
      console.info(mail)
      console.info('*********************************')
    } else {
      
      if (! cb) {
        cb= function(err, info) {
          if (err) {
            console.error('NodeMailer error:')
            console.error(err)
          }
          if (info) {
            console.log('NodeMailer sent mail:')
            console.log(info)
          } 
        } 
      }
      

      nmailer.sendMail(mail, cb)
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
    verify: verify_emailer
  }
  return emailer
}




export {init_emailer}