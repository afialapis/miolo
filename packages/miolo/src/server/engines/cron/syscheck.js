const os = require('os')
const diskspace = require('diskspace')
import { CYAN, GREEN, YELLOW } from 'farrapa-colors'

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
      logger.error(`[SERVER][${CYAN('SysCheck')}] RAM ${YELLOW(used)} MB used of ${GREEN(total)} MB (${YELLOW(perc)} %)`)
    } else {
      logger.info(`[SERVER][${CYAN('SysCheck')}] RAM ${YELLOW(used)} MB used of ${GREEN(total)} MB (${YELLOW(perc)} %)`)
    }
    

    diskspace.check('/', function (err, result)
    {
      const used = Math.round(toGB(result.used), 2)
      const total= Math.round(toGB(result.total), 2)
      const free = Math.round(toGB(result.free), 2)

      if (free<1) {
        logger.error(`[SERVER][${CYAN('SysCheck')}] DISK ${YELLOW(used)} GB used of ${GREEN(total)} MB (${YELLOW(free)} GB free)`)
      } else {
        logger.info(`[SERVER][${CYAN('SysCheck')}] DISK ${YELLOW(used)} GB used of ${GREEN(total)} MB (${YELLOW(free)} GB free)`)
      }
    });  
  }

  return sys_check_and_log


}

export {init_sys_check_and_log}