import {readFileSync} from 'fs'
import {dirname, resolve} from 'path'
import { fileURLToPath } from 'url'
import { miolo } from '../miolo-server.mjs'
import { makeConfig } from './config.mjs'
import { loader } from './ssr/loader.mjs'
import { 
  rendererGuest,
  rendererBasic,
  rendererPassport
} from './ssr/renderer.mjs'

const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = dirname(__my_filename)


async function demo_server (authType) {  
  const indexHTMLPath=  resolve(__my_dirname, `../cli/${authType}/index.html`)
  const indexHTML = readFileSync(indexHTMLPath, 'utf8')

  const renderer = authType=='guest'
    ? rendererGuest
    : authType=='basic'
    ? rendererBasic
    : rendererPassport
    
  const render= {
    html: indexHTML,
    ssr: {
      loader,
      renderer
    }
  }  

  const app = miolo(makeConfig(authType), render)
  await app.start()

  return app
}

export {demo_server}







