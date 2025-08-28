
import koaConnect from 'koa-connect'
// import { resolve } from 'path'

// Vite Dev Server
export async function init_vite_dev_server_middleware(app, viteConfig) {
  const isProduction = process.env.NODE_ENV === 'production'
  let vite

  if (!isProduction) {
    const { createServer } = await import('vite')
    const react = await import('@vitejs/plugin-react')
    const tailwindcss = await import('@tailwindcss/vite')

    // const tailwindConfigPath = resolve(process.cwd(), 'tailwind.config.js')

    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      plugins: [react.default(
        {
          babel: {
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }]
            ]
          }
        }),
        tailwindcss.default(/*{base: tailwindConfigPath}*/)
      ],
      ...viteConfig || {},
      // 
      base: viteConfig?.base || '/',
      root: viteConfig?.root || '',
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