import {
  init_cron_job
} from './init.mjs'
import {
  sys_check_config
} from './syscheck.mjs'
import { cyan, green_bold, yellow_bold } from 'tinguir'


function init_cron(app, custom) {
  const miolo = app.context.miolo
  const logger= miolo.logger
  
  const jobConfigs= [
    sys_check_config(),

    ...custom || []
  ]
  
  // Keep trace of conr jobs to be accessible later
  const jobInfos= [
    // {name: 'name', job: <job>, running: true/false} 
  ]
  
  jobConfigs.map(config => {
    const name = config.name
    const job= init_cron_job(miolo, config)
    jobInfos.push({
      name, 
      job,
      running: config?.start === true
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
      logger.error(`[SERVER] Cannot stop job ${cyan(idxOrName)}: Not Found`)
    }

    return jobInfo
  }

  const _start_job = (jobInfo) => {
    try {
      jobInfo.job.stop()
      jobInfo.running= true
      logger.debug(`[SERVER][Job ${cyan(jobInfo.name)}] ${green_bold('manually started!')}`)
    } catch(e) {
      logger.error(`[SERVER][Job ${cyan(jobInfo.name)}] Error manually starting it`)
      logger.error(e)
    }
  }  

  const _stop_job = (jobInfo) => {
    try {
      jobInfo.job.stop()
      jobInfo.running= false
      logger.debug(`[SERVER][Job ${cyan(jobInfo.name)}] ${yellow_bold('manually stopped!')}`) 
    } catch(e) {
      logger.error(`[SERVER][Job ${cyan(jobInfo.name)}] Error manually stopping it`)
      logger.error(e)
    }
  }

  const _start_job_by_idx_or_name = (idxOrName) => {
    const jobInfo = _find_job_by_idx_or_name(idxOrName)
    if (jobInfo) {
      _start_job(jobInfo)
    }
  }

  const _stop_job_by_idx_or_name = (idxOrName) => {
    const jobInfo = _find_job_by_idx_or_name(idxOrName)
    if (jobInfo) {
      _stop_job(jobInfo)
    }
  }

  const _stop_all_jobs = () => {
    jobInfos.map(jobInfo => {
      _stop_job(jobInfo)
    })
  }

  app.cron= {
    jobs: jobInfos,
    start: _start_job_by_idx_or_name,
    stop: _stop_job_by_idx_or_name,
    stop_all: _stop_all_jobs
  }
}

export {init_cron}