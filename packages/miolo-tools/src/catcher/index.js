import {make_request} from '../request'

const _DEF_CATCH_LOG_URL= '/sys/jserror'

function miolo_catcher_init (catch_log_url) {

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
      
      make_request('POST', catch_log_url || _DEF_CATCH_LOG_URL, params, false)

    } catch(e) {
      console.error(e)
    }
  }
}

export {miolo_catcher_init}