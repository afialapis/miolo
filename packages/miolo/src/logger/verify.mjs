import {make_logger} from './index.mjs'


function verify_logger(config) {
  const logger= make_logger(config)
  try {
    console.info('[miolo][Verify][LOGGER] Verifying...')
    
    logger.error('Error message')
    logger.warn('Warn message')
    logger.info('Info message')
    logger.verbose('Verbose message')
    logger.debug('Debug message')
    logger.silly('Silly message')

  } catch(e) {
    console.error('[miolo][Verify][LOGGER] ERROR: ')
    console.error(e)
  }
}

export {verify_logger}