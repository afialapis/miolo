import {mioloCatcher} from './catcher/index.mjs'
import {Fetcher} from './fetcher/index.mjs'

// similar but no react?
// import { useSsrData } from './ssr/hooks/useSsrData.mjs'
// import { useSsrDataOrReload } from './ssr/hooks/useSsrDataOrReload.mjs'

function miolo(config) {

  if (window?.miolo == undefined) {
    window.miolo= {
      Fetcher,
      catcher: false
    }
  } else {
    if (window.miolo.Fetcher!=undefined) {
      window.miolo.Fetcher = Fetcher
    }
    if (window.miolo.catcher!==true) {
      mioloCatcher(config?.catcher?.url)    
      window.miolo.catcher= true
    }
  }
}

export {miolo}