import {init_catcher} from './catcher/index.mjs'
import {init_fetcher} from './fetcher/index.mjs'
// import {init_socket} from './socket/index.mjs'

function miolo_client(context) {

  const {config} = context

  const fetcher = init_fetcher(config)

  if (config?.catcher_url) {
    init_catcher(config?.catcher_url, fetcher)  
  }

//  let socket
//  if (config?.socket?.enabled===true) {
//    const domain = config?.socket?.domain
//    const options = config?.socket?.options
//    socket = init_socket(domain, options)  
//  }

  const miolo_obj= {
    fetcher,
    //socket
  }

  return miolo_obj
}

export {miolo_client}