
import koaConnect from 'koa-connect'

// Vite Dev Server
export async function init_vite_dev_server_middleware(app, config) {
  const isProduction = process.env.NODE_ENV === 'production'
  let vite

  if (!isProduction) {
    const { createServer } = await import('vite')
    const react = await import('@vitejs/plugin-react')

    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      plugins: [react.default()],
      // 
      base: config?.base || '/',
      root: config?.root || '',
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100,
        ...config?.vite?.watch || {}
      }, 
      ...config?.vite || {}    
    })

    app.use(koaConnect(vite.middlewares))
  } 

  app.vite= vite
}