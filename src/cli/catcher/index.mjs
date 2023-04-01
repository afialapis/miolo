const _DEF_CATCHER_URL= '/sys/jserror'

function mioloCatcher (catcher_url) {

  window.onerror = function(msg, file, line, col, error) {
    try {
      const params= {
        'error': {
          msg, file, line, col, error
        },
        'path' : window.location.pathname,
        'agent': 'UserAgent' + navigator.userAgent
      }

      const body= JSON.stringify(params || {}, (k, v) => v === undefined ? null : v)
      
      const request = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body
      }

      fetch(catcher_url || _DEF_CATCHER_URL, request)

    } catch(e) {
      console.error(e)
    }
  }
}

export {mioloCatcher}