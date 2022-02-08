import { LIGHT_CYAN, LIGHT_BLUE, LIGHT_GREEN, YELLOW, LIGHT_RED, RED } from 'farrapa-colors'
/* https://github.com/winstonjs/winston/issues/925 */
/* https://github.com/winstonjs/winston/issues/287 */
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, _label, printf, errors } = format


const init_logger = (config, emailer) => {
  const LEVEL_COLORS= {
    silly  : LIGHT_CYAN,
    debug  : LIGHT_BLUE,
    verbose: LIGHT_GREEN,
    info   : YELLOW,
    warn   : LIGHT_RED,
    error  : RED
  }

  const myFormat = printf(info => {
    const lc = LEVEL_COLORS[info.level]
    const tm = new Date(info.timestamp)
    const ts= tm.toLocaleString(config?.format?.locale || 'en')
    //const ts= tm.toString().substr(4, 20)
    const log= `[miolo] ${lc(ts)} ${lc(info.level)} ${info.message}`
    return info.stack
      ? `${log}\n${info.stack}`
      : log;    
  })


  let _log_transports= []
  //
  // Console transport
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 

  if (config.console.enabled) {
    _log_transports.push(
        new transports.Console({
          humanReadableUnhandledException: true,
          level    : config.console.level ,
          handleExceptions: true
    }))
  }

  //
  // File transport
  //
  if (config.file.enabled) {
    _log_transports.push(
      new transports.File({ 
        filename : config.file.filename, 
        level    : config.file.level ,
        humanReadableUnhandledException: true,
        handleExceptions: true})
    )
  }

  //
  // Mail transport
  //
  if (config.mail.enabled) {
    let winston = require("winston");
    const {init_logger_to_mail}= require('./logger_mail')
    
    const MailerLogger= init_logger_to_mail(config.mail, emailer)
    winston.transports.MailerLogger = MailerLogger;

    _log_transports.push(
      new transports.MailerLogger({
        level    : config.mail.level,
        humanReadableUnhandledException: true,
        handleExceptions: true    
      })
    )
  }

  //
  // Logger
  //
  const logger = createLogger({
    level: config?.level || 'silly',
    format: combine(
      format.errors({ stack: true }),
      timestamp(),
      myFormat
    ),
    transports: _log_transports
  })

  return logger
}


module.exports= {init_logger}




