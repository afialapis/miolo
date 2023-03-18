import { red, cyan, magenta, yellow, gray, red_light } from 'tinguir'
/* https://github.com/winstonjs/winston/issues/925 */
/* https://github.com/winstonjs/winston/issues/287 */
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, _label, printf, errors } = format


const init_logger = (config, emailer) => {
  const LEVEL_COLORS= {
    silly  : gray,
    debug  : magenta,
    verbose: cyan,
    info   : yellow,
    warn   : red_light,
    error  : red
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
          level    : config?.console?.level || config?.level || 'silly',
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
        level    : config?.file?.level || config?.level || 'info' ,
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
      errors({ stack: true }),
      timestamp(),
      myFormat
    ),
    transports: _log_transports
  })

  return logger
}


export {init_logger}




