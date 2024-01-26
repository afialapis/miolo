import fs from 'fs'
import path from 'path'
import { red, cyan, magenta, yellow, gray, red_light } from 'tinguir'
/* https://github.com/winstonjs/winston/issues/925 */
/* https://github.com/winstonjs/winston/issues/287 */
import {init_logger_to_mail} from './logger_mail.mjs'
import { createLogger, format, transports } from 'winston'
// import { reopenTransportOnHupSignal } from './reopenTransportOnHupSignal.mjs'
import  'winston-daily-rotate-file'
import { intre_to_str, intre_now } from 'intre'

const { combine, timestamp, _label, printf, errors } = format


const init_logger = (config, emailer, prefix= 'miolo') => {
  const LEVEL_COLORS= {
    silly  : gray,
    debug  : magenta,
    verbose: cyan,
    info   : yellow,
    warn   : red_light,
    error  : red
  }

  const LEVEL_ABBRV= {
    silly  : 'sly',
    debug  : 'dbg',
    verbose: 'vbs',
    info   : 'inf',
    warn   : 'wrn',
    error  : 'err',
  }

  const myFormat = info => {
    const lc = LEVEL_COLORS[info.level]
    const tm = new Date(info.timestamp)
    const ts= tm.toLocaleString(config?.format?.locale || 'en')
    //const ts= tm.toString().substr(4, 20)
    const log= `[${prefix}] ${lc(ts)} ${lc(LEVEL_ABBRV[info.level])} ${info.message}`
    return info.stack
      ? `${log}\n${info.stack}`
      : log    
  }

  let _log_transports= []
  //
  // Console transport
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 

  if (config?.console?.enabled === true) {
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
  // logrotate's copytruncate seems not enough
  //  https://github.com/winstonjs/winston/issues/943
  //  https://gist.github.com/suprememoocow/5133080
  //
  //  if (config?.file?.enabled === true) {
  //    const fileTransport = new transports.File({ 
  //      filename : config?.file?.filename || '/var/log/miolo.log', 
  //      level    : config?.file?.level || config?.level || 'info' ,
  //      humanReadableUnhandledException: true,
  //      handleExceptions: true
  //    })
  //
  //    reopenTransportOnHupSignal(fileTransport)
  //
  //    _log_transports.push(fileTransport)
  //  }

  if (config?.file?.enabled === true) {
    const datePattern = config?.file?.datePattern || 'YYYY-MM-DD'

    const fileTransport = new transports.DailyRotateFile({ 
      level    : config?.file?.level || config?.level || 'info' ,

      frequency: config?.file?.frequency,
      datePattern,
      zippedArchive: config?.file?.zippedArchive == true,
      maxSize: config?.file?.maxSize || '20m',
      maxFiles: config?.file?.maxFiles || '10d',
      
      filename : config?.file?.filename 
        ? config.file.filename.replace('%MIOLO%', prefix)
        : '/var/log/afialapis/miolo.%DATE%.log', 
      
      auditFile: config?.file?.auditFile
        ? config.file.auditFile.replace('%MIOLO%', prefix)
        : '/var/log/afialapis/miolo.audit.json',
      
      symlinkName: config?.file?.symlinkName
        ? config.file.symlinkName.replace('%MIOLO%', prefix)
        : 'miolo.log',

      createSymlink: config?.file?.createSymlink == true,
      
      watchLog: true,

      humanReadableUnhandledException: true,
      handleExceptions: true
    })

    const _file_log = (s) => {
      const currentDate = intre_to_str(intre_now(), datePattern)
      const filename = path.join(fileTransport.dirname, fileTransport.filename.replace('%DATE%', currentDate))
      
      const msg = myFormat({
        level: 'info',
        message: `[logger][file-rotate] ${s}\n`,
        timestamp: intre_now()
      })
      try {
        fs.accessSync(filename, fs.constants.F_OK)
        fs.appendFileSync(filename, msg)
      } catch(_) {
        fs.writeFileSync(filename, msg, { encoding: 'utf-8' })
      }
      if (config?.console?.enabled === true) {
        if (fileTransport.levels[config?.console?.level || config?.level || 'error'] >= fileTransport.levels['info']) {
          console.log(msg)
        }
      }
    }

    const _fname = (f) => magenta(f.replace(fileTransport.dirname+path.sep, ''))


    fileTransport.on('new', function(newFilename) {
      _file_log(`New log file: ${_fname(newFilename)}`)
    });

    fileTransport.on('rotate', function(oldFilename, newFilename) {
      _file_log(`Rotating log file: ${_fname(oldFilename)} -- ${_fname(newFilename)}`)
    })

    fileTransport.on('archive', function(zipFilename) {
      _file_log(`Archived log file: ${_fname(zipFilename)}`)
    })

    fileTransport.on('logRemoved', function(removedFilename) {
      _file_log(`Removed log file: ${_fname(removedFilename)}`)
    })

    fileTransport.on('error', function(error) {
      // do something fun
      _file_log(red(`Error: ${error}`))
    })

    _log_transports.push(fileTransport)
  }


  //
  // Mail transport
  //
  if (config?.mail?.enabled === true) {    
    const MailerLogger= init_logger_to_mail(config.mail, emailer)
    transports.MailerLogger = MailerLogger

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
      printf(myFormat)
    ),
    transports: _log_transports
  })

  //console.log(logger.transports[0])
  try {
    logger.info(`[logger] Inited for ${logger.transports.map(t => `${t.name} (${t.level})${t.silent ? red(' SILENT!') : ''}`).join(', ')}`)
  } catch(_) {}

  return logger
}


export {init_logger}




