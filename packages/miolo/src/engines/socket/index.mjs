import { Server } from "socket.io"

function init_socket(app, config) {
  if (config?.enabled !== true) {
    return
  }

  const logger = app.context.miolo.logger

  logger.info("[socket] Attaching Socket server")

  const io = new Server(app.http.server)

  if (config?.userRooms === true) {
    io.use(async (socket, next) => {
      try {
        const { store, options } = app.context.miolo.session || {}
        if (store && options) {
          // Create a fake Koa context to easily parse the signed cookies
          const ctx = app.createContext(
            socket.request,
            socket.request.res || { headersSent: false }
          )

          // Read the session cookie (Koa handles signature validation if options.signed is true)
          const sessionCookieValue = ctx.cookies.get(options.key, options)

          if (sessionCookieValue) {
            // If the cookie is present, koa-session stores the external key directly
            // or sometimes it's base64 encoded. koa-session's decode function:
            const sessionId = sessionCookieValue

            const session = await store.get(sessionId, undefined, {})

            if (session?.user) {
              const userId = session.user?.id
              socket.join(`user_${userId}`)
              socket.mioloUser = userId // Attach for convenience
              logger.info(`[socket] Socket ${socket.id} joined room user_${userId}`)
            }
          }
        }
      } catch (err) {
        logger.error(`[socket] Error parsing session: ${err.message}`)
      }
      next()
    })
  }

  io.on("connection", (socket) => {
    logger.info(`[socket] Connection from ... `)

    if (config?.ssr?.enabled === true) {
      socket.on("ssr-versions", async () => {
        logger.verbose(`[socket] ssr-versions requested for ${socket.id}`)
        try {
          const versions = await app.context.miolo.cache.get_cache_versions()
          const ssr_versions = versions[config?.ssr?.namespace || "ssr"] || {}
          socket.emit("ssr-versions", ssr_versions)
          logger.verbose(
            `[socket] ssr-versions sent for ${socket.id}: ${JSON.stringify(ssr_versions)}`
          )
        } catch (err) {
          logger.error(`[socket] Error getting cache versions: ${err.message}`)
        }
      })
    }

    if (config?.connection) {
      config.connection(socket)
    }

    for (const ns of config?.namespaces || []) {
      socket.on(ns.name, ns.listener)
    }
  })

  if (config?.ssr?.enabled === true) {
    io.emitSsrVersions = async (ctx) => {
      logger.verbose(`[socket] Emitting ssr-versions`)
      try {
        const versions = await ctx.miolo.cache.get_cache_versions()
        const ssr_versions = versions[config?.ssr?.namespace || "ssr"] || {}
        io.emit("ssr-versions", ssr_versions)
        logger.verbose(`[socket] ssr-versions sent: ${JSON.stringify(ssr_versions)}`)
      } catch (err) {
        logger.error(`[socket] Error emitting cache versions: ${err.message}`)
      }
    }

    io.emitSsrInvalidate = async (ctx, name) => {
      logger.verbose(`[socket] Emitting ssr-invalidate for ${name}`)
      try {
        const socketId = ctx.request?.headers?.["x-socket-id"]
        io.emit("ssr-invalidate", { name, exclude_socket_id: socketId })
        logger.verbose(`[socket] ssr-invalidate sent for ${name}`)
      } catch (err) {
        logger.error(`[socket] Error emitting ssr-invalidate: ${err.message}`)
      }
    }

    io.emitSsrRefresh = async (ctx, name) => {
      logger.verbose(`[socket] Emitting ssr-refresh for ${name}`)
      try {
        const socketId = ctx.request?.headers?.["x-socket-id"]
        io.emit("ssr-refresh", { name, exclude_socket_id: socketId })
        logger.verbose(`[socket] ssr-refresh sent for ${name}`)
      } catch (err) {
        logger.error(`[socket] Error emitting ssr-refresh: ${err.message}`)
      }
    }
  }

  app.context.miolo.io = io
}

export { init_socket }
