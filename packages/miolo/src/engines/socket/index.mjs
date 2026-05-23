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
    logger.info(`[socket] Connection from ... `) // ${i.ip} ${i.id}`)

    if (config?.connection) {
      config.connection(socket)
    }

    for (const ns of config?.namespaces || []) {
      socket.on(ns.name, ns.listener)
    }
  })

  app.context.miolo.io = io
}

export { init_socket }
