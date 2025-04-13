import path from 'path'


// Resuse Vite Watcher
export async function init_watcher_dev_server_middleware(app, watcherConfig, ssrConfig) {
  let watcher

  const isEnabled = watcherConfig?.enabled === true
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (isEnabled && (!isProduction)){

    // Let's reuse Vite's cholkidar instance to listen to changes in server code
    watcher = app.vite.watcher

    // Extra dirs to watch
    const serverDirsToWatch = watcherConfig?.dirs || [
      path.resolve(process.cwd(), path.basename(ssrConfig.server))
    ]

    // Listen to changes in the extra dirs
    serverDirsToWatch.forEach((dir) => {
      watcher.add(dir)
      app.context.miolo.logger.info(`[watcher] Vite is now watching for changes in: ${dir}`)
    })
   
    // Listen to changes in the extra dirs
    watcher.on('change', (filePath) => {
      app.context.miolo.logger.info(`[watcher] File changed: ${filePath}. Reloading server...`)
      // Aquí puedes implementar la lógica para reiniciar tu servidor Koa
      // Por ejemplo, podrías cerrar el servidor actual y crear uno nuevo,
      // o usar alguna forma de recarga en caliente específica de Koa (si existe).
      // Un reinicio completo del proceso de Node.js suele ser la forma más segura.
      //process.exit(0) // Forzar la salida del proceso para que un gestor de procesos lo reinicie
      process.send('restart') // Envía un mensaje al proceso padre para reiniciar
    })

  } 

  app.watcher= watcher
}