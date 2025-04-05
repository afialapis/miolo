import {readFileSync} from 'fs'
import {dirname, resolve} from 'path'
import { fileURLToPath } from 'url'
import { miolo } from '../miolo-server.mjs'
import { makeConfig } from './config.mjs'
import { loader } from './ssr/loader.mjs'

/*
import { 
  rendererGuest,
  rendererBasic,
  rendererPassport
} from './ssr/renderer.mjs'
*/

const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = dirname(__my_filename)


async function demo_server (authType) {  
  const indexHTMLPath=  resolve(__my_dirname, `../cli/${authType}/index.html`)
  const indexHTML = readFileSync(indexHTMLPath, 'utf8')

  const client = authType=='guest'
    ? 'cli/guest/index.mjs'
    : authType=='basic'
    ? 'cli/basic/index.mjs'
    : 'cli/credentials/index.mjs'

  const server = authType=='guest'
    ? 'server/ssr/entry-guest.jsx'
    : authType=='basic'
    ? 'server/ssr/entry-basic.jsx'
    : 'server/ssr/entry-credentials.jsx'
    
  const render= {
    //html: indexHTML,
    //ssr: {
    //  loader,
    //  renderer
    //}
    loader,
    client,
    server,
    base: '/demo',
    root: 'demo'
  }  

  const app = await miolo(makeConfig(authType), render)
  await app.start()

  return app
}

// export {demo_server}

demo_server('credentials')







