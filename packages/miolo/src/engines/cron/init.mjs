
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
    async (onComplete) => {
      try {
        logger.silly(`[cron][Custom Job ${cyan(name)}] ${green_bold('ticks!')}`)
        await config.onTick(miolo, onComplete)
      } catch(e) {
        logger.error(`[cron][Custom Job ${cyan(name)}] Error at onTick()`)
        logger.error(e)
      }
    },

    // onComplete(miolo)
    async () => {
      logger.silly(`[cron][Custom Job ${cyan(name)}] ${green_bold('completed!')}`)
      if (config?.onComplete) {
        try {
          await config.onComplete(miolo)
        } catch(e) {
          logger.error(`[cron][Custom Job ${cyan(name)}] Error at onComplete()`)
          logger.error(e)
        }
      }
    },

    // Do not start yet
    false,

    config?.timezone || 'Europe/Madrid',
    // config?.context || null,
    // config?.runOnInit || null,
    // config?.utcOffset || null,
    // config?.unrefTimeout || null,
  )    
  return job
}