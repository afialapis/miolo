import {make_request} from '../request'

const CATCH_LOG_URL= '/sys/jserror'

function miolo_catcher_init () {

  window.onerror = function(msg, file, line, col, error) {
    try {
      const agent= 'UserAgent' + navigator.userAgent
      const params= {
        'error': {
          msg, file, line, col, error
        },
        'path' : window.location.pathname,
        'agent': agent,
      }
      
      make_request('POST', CATCH_LOG_URL, params, false)

    } catch(e) {
      console.error(e)
    }
  }
}

export {miolo_catcher_init}