function init_catcher (catcher_url, fetcher) {
  if (typeof window == "undefined") {
    return
  }  

  if (window.miolo_listeners===true) {
    return
  }

  //  window.onerror = function(msg, file, line, col, error) {
  //    try {
  //      const params= {
  //        'error': {
  //          msg, file, line, col, error
  //        },
  //        'path' : window.location.pathname,
  //        'agent': 'UserAgent' + navigator.userAgent
  //      }
  //
  //      fetcher.post(catcher_url, params)
  //    } catch(e) {
  //      console.error(e)
  //    }
  //  }


  window.addEventListener("error", (event) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent

    try {
      const params= {
        'error': {
          msg: event?.message || 'Client error',
          file: event?.filename,
          line: event?.lineno,
          col: event?.colno,
          error: event?.error
        },
        'path' : window.location.pathname,
        'agent': 'UserAgent' + navigator.userAgent
      }

      fetcher.post(catcher_url, params)
    } catch(e) {
      console.error(e)
    }
  }) 

  window.addEventListener("unhandledrejection", (event) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent

    try {
      const params= {
        'warning': {
          msg: event?.reason || 'Client Unhandled rejection',
          file: undefined,
          line: undefined,
          col: undefined,
          error: event?.reason
        },
        'path' : window.location.pathname,
        'agent': 'UserAgent' + navigator.userAgent
      }

      fetcher.post(catcher_url, params)
    } catch(e) {
      console.error(e)
    }
  }) 

  window.miolo_listeners = true

}

export {init_catcher}