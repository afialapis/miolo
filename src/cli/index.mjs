import {init_catcher} from './catcher/index.mjs'
import {init_fetcher} from './fetcher/index.mjs'

function miolo_client(context) {

  const {config, ...rest_context} = context

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