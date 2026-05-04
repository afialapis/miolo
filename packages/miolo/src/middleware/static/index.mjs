import { existsSync } from "node:fs"
import koa_favicon from "koa-favicon"
import koa_mount from "koa-mount"
import koa_serve from "koa-static"

const init_static_middleware = (app, config) => {
  const { favicon, folders, headers } = config

  if (favicon && existsSync(favicon)) {
    app.context.miolo.logger.debug(`[static] Serving favicon from -${favicon}-`)
    app.use(koa_favicon(favicon))
  } else {
    app.context.miolo.logger.warn(
      `[static] Cannot serve favicon from -${favicon}- (does not exist)`
    )
  }

  // Do not cache some specific files
  app.use(async (ctx, next) => {
    for (const [fpath, fheaders] of Object.entries(headers)) {
      if (ctx.path === fpath) {
        app.context.miolo.logger.info(
          `[static] Setting headers for -${fpath}- ${Object.keys(fheaders).join(", ")}`
        )
        for (const [key, value] of Object.entries(fheaders)) {
          ctx.set(key, value)
        }
        break
      }
    }
    await next()
  })

  for (const [froute, fpath] of Object.entries(folders)) {
    if (fpath && existsSync(fpath)) {
      app.context.miolo.logger.info(`[static] Mounting static folder ${froute} => -${fpath}-`)
      app.use(koa_mount(froute, koa_serve(fpath, { index: false })))
    } else {
      app.context.miolo.logger.warn(
        `[static] Cannot mount static folder ${froute} => -${fpath}- (does not exist)`
      )
    }
  }
}

export { init_static_middleware }
