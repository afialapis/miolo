
import {CronJob} from 'cron'
import { cyan, green_bold } from 'tinguir'

export function init_cron_job(miolo, config) {
  const logger= miolo.logger
  const onTickName = config?.onTick?.name
    ? config.onTick.name != 'onTick'
      ? config.onTick.name
      : 'custom'
      : 'custom'

  const name = config?.name || onTickName

  const job= new CronJob(
    // cronTime
    config?.cronTime || '*/5 * * * *',
    
    // onTick(miolo, onComplete)
    (onComplete) => {
      try {
        logger.silly(`[SERVER][Custom Job ${cyan(name)}] ${green_bold('ticks!')}`)
        config.onTick(miolo, onComplete)
      } catch(e) {
        logger.error(`[SERVER][Custom Job ${cyan(name)}] Error at onTick()`)
        logger.error(e)
      }
    },

    // onComplete(miolo)
    () => {
      logger.silly(`[SERVER][Custom Job ${cyan(name)}] ${green_bold('completed!')}`)
      if (config?.onComplete) {
        try {
          config.onComplete(miolo)
        } catch(e) {
          logger.error(`[SERVER][Custom Job ${cyan(name)}] Error at onComplete()`)
          logger.error(e)
        }
      }
    },

    config?.start === true,
    config?.timezone || 'Europe/Madrid',
    // config?.context || null,
    // config?.runOnInit || null,
    // config?.utcOffset || null,
    // config?.unrefTimeout || null,
  )    
  return job
}