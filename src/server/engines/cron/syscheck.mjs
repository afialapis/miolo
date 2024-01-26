import os from 'os'
import diskspace from 'diskspace'
import { cyan, green, yellow } from 'tinguir'

function _toMB(bytes) {
  if (!bytes) return 0
  return bytes/1000000
}


function _toGB(kbytes) {
  if (!kbytes) return 0
  return kbytes/1000000
}



function _sys_check_and_log(logger) {
  

  const used= Math.round(_toMB(os.freemem()), 2)
  const total= Math.round(_toMB(os.totalmem()), 2)
  const perc= Math.round( (used*100)/total, 2)

  if (perc>80) {
    logger.error(`[cron][${cyan('SysCheck')}] RAM ${yellow(used)} MB used of ${green(total)} MB (${yellow(perc)} %)`)
  } else {
    logger.info(`[cron][${cyan('SysCheck')}] RAM ${yellow(used)} MB used of ${green(total)} MB (${yellow(perc)} %)`)
  }
  

  diskspace.check('/', function (err, result)
  {
    const used = Math.round(_toGB(result.used), 2)
    const total= Math.round(_toGB(result.total), 2)
    const free = Math.round(_toGB(result.free), 2)

    if (free<1) {
      logger.error(`[cron][${cyan('SysCheck')}] DISK ${yellow(used)} GB used of ${green(total)} GB (${yellow(free)} GB free)`)
    } else {
      logger.info(`[cron][${cyan('SysCheck')}] DISK ${yellow(used)} GB used of ${green(total)} GB (${yellow(free)} GB free)`)
    }
  });  
}


export function sys_check_config() {
  return {
    name: 'SysCheck',
    cronTime: '0,15,30,45 * * * *',
    onTick: (miolo, _onCompleted) => {
      _sys_check_and_log(miolo.logger)
    },
    start: true   
  }
}