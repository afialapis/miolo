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
    const serverDirsToWatch = watcherConfig?.dirs || ['server', 'src/server']

    // Listen to changes in the extra dirs
    serverDirsToWatch.forEach((dir) => {
      watcher.add(path.resolve(process.cwd(), dir))
      app.context.miolo.logger.info(`[watcher] Vite is now watching for changes also in: ${dir}`)
    })
   
    // Listen to changes in the extra dirs
    watcher.on('change', async (filePath) => {
      let isCustom = false
      serverDirsToWatch.forEach((dir) => {
        if (filePath.startsWith(path.resolve(process.cwd(), dir))) {
          isCustom = true
        }
      })
      if (!isCustom) return // Ignore changes outside the custom watched directories
      app.context.miolo.logger.info(`[watcher] File changed: ${filePath}. Reloading server...`)

      await app.stop()
      process.send('miolo_restart') // Envía un mensaje al proceso padre para reiniciar
    })
  } 

  app.watcher= watcher
}