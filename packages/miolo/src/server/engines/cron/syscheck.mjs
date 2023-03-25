import os from 'os'
import diskspace from 'diskspace'
import { cyan, green, yellow } from 'tinguir'

function init_sys_check_and_log(logger) {
  function toMB(bytes) {
    if (!bytes) return 0
    return bytes/1000000
  }


  function toGB(kbytes) {
    if (!kbytes) return 0
    return kbytes/1000000
  }

  function sys_check_and_log() {
    

    const used= Math.round(toMB(os.freemem()), 2)
    const total= Math.round(toMB(os.totalmem()), 2)
    const perc= Math.round( (used*100)/total, 2)

    if (perc>80) {
      logger.error(`[SERVER][${cyan('SysCheck')}] RAM ${yellow(used)} MB used of ${green(total)} MB (${yellow(perc)} %)`)
    } else {
      logger.info(`[SERVER][${cyan('SysCheck')}] RAM ${yellow(used)} MB used of ${green(total)} MB (${yellow(perc)} %)`)
    }
    

    diskspace.check('/', function (err, result)
    {
      const used = Math.round(toGB(result.used), 2)
      const total= Math.round(toGB(result.total), 2)
      const free = Math.round(toGB(result.free), 2)

      if (free<1) {
        logger.error(`[SERVER][${cyan('SysCheck')}] DISK ${yellow(used)} GB used of ${green(total)} GB (${yellow(free)} GB free)`)
      } else {
        logger.info(`[SERVER][${cyan('SysCheck')}] DISK ${yellow(used)} GB used of ${green(total)} GB (${yellow(free)} GB free)`)
      }
    });  
  }

  return sys_check_and_log


}

export {init_sys_check_and_log}