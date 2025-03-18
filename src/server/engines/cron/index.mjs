import {
  init_cron_job
} from './init.mjs'
import {
  sys_check_config
} from './syscheck.mjs'
import {
  ipsum_config
} from './ipsum.mjs'
import { cyan, green_bold, yellow_bold } from 'tinguir'


export function init_cron(app, custom) {
  const miolo = app.context.miolo
  const logger= miolo.logger
  
  const jobConfigs= [
    sys_check_config(),
    ipsum_config(),
    ...custom || []
  ]
  
  // Keep trace of conr jobs to be accessible later
  const jobInfos= [
    // {name: 'name', job: <job>, isActive: true/false} 
  ]
  
  jobConfigs.map(config => {
    const name = config.name
    const job= init_cron_job(miolo, config)
    jobInfos.push({
      name, 
      job,
      isActive: false
    })  
  })
  
  const _find_job_by_idx_or_name = (idxOrName) => {
    let jobInfo
    if (typeof idxOrName == 'number') {
      jobInfo= jobInfos[idxOrName]
    } else {
      jobInfo= jobInfos.filter(j => j.name == idxOrName)[0]
    }

    if (!jobInfo) {
      logger.error(`[cron] Job ${cyan(idxOrName)} Not Found`)
    }

    return jobInfo
  }

  const _start_job = (jobInfo) => {
    try {
      jobInfo.job.start()
      jobInfo.isActive= true
      logger.debug(`[cron][Job ${cyan(jobInfo.name)}] ${green_bold('started!')}`)
      return 1
    } catch(e) {
      logger.error(`[cron][Job ${cyan(jobInfo.name)}] Error starting it`)
      logger.error(e)
      return 0
    }
  }  

  const _start_job_by_idx_or_name = (idxOrName) => {
    const jobInfo = _find_job_by_idx_or_name(idxOrName)
    if (jobInfo) {
      const done = _start_job(jobInfo)
      return [done, jobInfo.name]
    }
    return [0, '']
  }

  const _start_all_jobs = () => {
    try {
      let started= [], errors= []
      jobInfos.map(jobInfo => {
        const done= _start_job(jobInfo)
        if (done == 1) {
          started.push(jobInfo.name)
        } else {
          errors.push(jobInfo.name)
        }
      })
      if (started.length > 0) {
        logger.info(`[cron] Started ${started.length} jobs: ${started}`)
      }
      if (errors.length > 0) {
        logger.warn(`[cron] Could not start ${errors.length} jobs: ${errors}`)
      }
    } catch(error) {
      logger.error(`[cron] start() error: ${error}`)
    }
  
  }

  const _stop_job = (jobInfo) => {
    try {
      jobInfo.job.stop()
      jobInfo.isActive= false
      logger.debug(`[cron][Job ${cyan(jobInfo.name)}] ${yellow_bold('stopped!')}`) 
      return 1
    } catch(e) {
      logger.error(`[cron][Job ${cyan(jobInfo.name)}] Error stopping it`)
      logger.error(e)
      return 0
    }
  }

  const _stop_job_by_idx_or_name = (idxOrName) => {
    const jobInfo = _find_job_by_idx_or_name(idxOrName)
    if (jobInfo) {
      const done = _stop_job(jobInfo)
      return [done, jobInfo.name]
    }
    return [0, '']
  }

  const _stop_all_jobs = () => {
    try {
      let stopped= [], errors= []
      jobInfos.map(jobInfo => {
        const done= _stop_job(jobInfo)
        if (done == 1) {
          stopped.push(jobInfo.name)
        } else {
          errors.push(jobInfo.name)
        }
      })
      if (stopped.length > 0) {
        logger.info(`[cron] Stopped ${stopped.length} jobs: ${stopped}`)
      }
      if (errors.length > 0) {
        logger.warn(`[cron] Could not stop ${errors.length} jobs: ${errors}`)
      }
    } catch(error) {
      logger.error(`[cron] stop() error: ${error}`)
    }
  }

  app.cron= {
    jobs:      jobInfos,
    start_one: _start_job_by_idx_or_name,
    start:     _start_all_jobs,
    stop_one : _stop_job_by_idx_or_name,
    stop:      _stop_all_jobs
  }

  return app
}
