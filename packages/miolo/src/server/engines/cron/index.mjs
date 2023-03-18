import {init_sys_check_and_log} from './syscheck.mjs'
const CronJob = require('cron').CronJob


function init_cron(logger) {
  
  const sys_check_and_log= init_sys_check_and_log(logger)
  
  const _sCheck = new CronJob(
    '30 * * * *',
    sys_check_and_log,
    null,
    true,
    'Europe/Madrid'
  );
}

export {init_cron}