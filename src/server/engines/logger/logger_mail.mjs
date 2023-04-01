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

      let tit= '';
      try {
        tit= info.message.split("\n")[0]
      } catch(e) {
        tit= info.message.toString();
      }

      tit= uncolor(tit)
      
      let subject = config.name + ': [' + info.level.toUpperCase() + '] ' + tit;

      let mail= {
        from    : this.from,
        to      : this.to,
        subject : subject, 
        text    : uncolor(info.message)
      }

      emailer.send(mail, function() {
        self.emit("logged");
        callback(null, true);    
      });
      
  };


  
  return MailerLogger
}

export {init_logger_to_mail}