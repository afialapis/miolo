
import koaConnect from 'koa-connect'
// import { resolve } from 'path'
import {createServer} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindVite from '@tailwindcss/vite'

// Vite Dev Server
export async function init_vite_dev_server_middleware(app, viteConfig) {
  const isProduction = process.env.NODE_ENV === 'production'
  let vite
  
  if (!isProduction) {
    // const tailwindConfigPath = resolve(process.cwd(), 'tailwind.config.js')
    // const tailwindConfig = await import(tailwindConfigPath)

    vite = await createServer({
      server: { 
        middlewareMode: true ,
        port: process.env?.MIOLO_PORT || 8001,
        hmr: {
          port: process.env?.MIOLO_DEV_PORT || ((process.env?.MIOLO_PORT || 8001) - 1000)
        }
      },
      appType: 'custom',
      plugins: [react(
        {
          babel: {
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }]
            ]
          }
        }),
        tailwindVite(
          // @tailwindcss/vite does not accept params
          //{config: tailwindConfig}
        )
      ],
      ...viteConfig || {},
      // 
      base: viteConfig?.base || '/',
      root: viteConfig?.root || process.cwd(),
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100,
        ...viteConfig?.vite?.watch || {}
      }
    })

    app.use(koaConnect(vite.middlewares))
  } 

  app.vite= vite
}