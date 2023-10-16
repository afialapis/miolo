import {init_catcher} from './catcher/index.mjs'
import {init_fetcher} from './fetcher/index.mjs'

// similar but no react?
// import { useSsrData } from './ssr/hooks/useSsrData.mjs'
// import { useSsrDataOrReload } from './ssr/hooks/useSsrDataOrReload.mjs'

function miolo_client(config) {

  const fetcher = init_fetcher(config)
  if (config?.catcher_url) {
    init_catcher(config?.catcher_url, fetcher)  
  }
  const miolo_obj= {
    fetcher
  }

  return miolo_obj
}

export {miolo_client}