"use strict";
let util    = require("util");
let winston = require("winston");
import { uncolor } from 'farrapa-colors'

function init_logger_to_mail(config, emailer) {


  let MailerLogger = function (options) {
      winston.Transport.call(this, options);
      options = options || {};

      this.silent= options.silent || false
      this.level = options.level  || 'info'
      this.to    = options.to     || config.to,
      this.from  = config.from
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

      if (this.silent) return callback(null, true);

      let tit= '';
      try {
        tit= info.message.split("\n")[0]
      } catch(e) {
        tit= info.message.toString();
      }

      tit= uncolor(tit)
      
      let subject = config.name + ': [' + info.level.toUpperCase() + '] ' + tit;

      let mail= {
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

module.exports = {init_logger_to_mail}