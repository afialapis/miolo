// "use strict";
import util from 'util'
import winston from 'winston'
import { uncolor } from 'tinguir'

function init_logger_to_mail(config, emailer) {


  let MailerLogger = function (options) {
      winston.Transport.call(this, options);
      options = options || {};

      this.level = config.level  || 'info'
      this.ename = config?.name  || emailer.defaults.name
      this.to    = config.to     || emailer.defaults.to
      this.from  = config.from   || emailer.defaults.from
      this.humanReadableUnhandledException = options.humanReadableUnhandledException || true;
      this.handleExceptions                = options.handleExceptions || true;
      this.json                            = options.json || false;
      this.colorize                        = options.colorize || false;



      
  };

  /** @extends winston.Transport */
  util.inherits(MailerLogger, winston.Transport);

  //
  // Expose the name of this Transport on the prototype
  //
  MailerLogger.prototype.name = 'MailerLogger';


  MailerLogger.prototype.log = function (info, callback) {
    let self = this;

    let title = ''
    let body = ''

    try {
      try {
        title= info.message.split("\n")[0]
      } catch(e) {
        title= info.message.toString();
      }

      title= uncolor(title)
      
    } catch(err) {
      title = `Could not create a title for the error (${err.toString()})`
    }

    try {
      try {
        body = uncolor(info.message)
      } catch(err) {
        body = info.message.toString()
      }  
    } catch(err) {
      body = `Could not create a body for the error (${err.toString()})`
    }

    let subject = `${config?.name} [${info.level.toUpperCase()}] ${title}`

    let mail= {
      from    : this.from,
      to      : this.to,
      subject : subject, 
      text    : body
    }

    emailer.send(mail, function() {
      self.emit("logged");
      callback(null, true);    
    });
      
  };
  
  return MailerLogger
}

export {init_logger_to_mail}