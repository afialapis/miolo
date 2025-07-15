//import IO from 'koa-socket-2'
import { Server } from 'socket.io'

function init_socket(app, config) {
  if (config?.enabled !== true) {
    return
  }

  const logger = app.context.miolo.logger

  logger.info('[socket] Attaching Socket server')

  const io = new Server(app.http.server)

  io.on('connection', function (socket) {
    logger.debug(`[socket] Connection from ... `) // ${i.ip} ${i.id}`)
    
    if (config?.connection) {
      config.connection(socket)
    }
    
    for (const ns of config?.namespaces || []) {
      socket.on(ns.name, ns.listener)
    }
  })
  

  //  const getInfo = (ctx) => {
  //    let i= {id: '', ip: ''}
  //    try { 
  //      i.id = ctx.socket.id
  //    } catch (e) {}
  //    try {
  //      i.ip = ctx.socket.handshake.address
  //    } catch (e) {}
  //    return i
  //  }

  // const io = new IO({ origins: '*:*'})

  //  io.on('connection', function (ctx, data) {
  //    const logger = ctx.miolo.logger
  //    const i= getInfo(ctx)
  //    logger.warn(`[socket] Connection from ${i.ip} ${i.id}`)
  //    if (config?.connection) {
  //      config.connection(ctx, data)
  //    }
  //  })

  //  io.on('disconnect', function (ctx, data) {
  //    const logger = ctx.miolo.logger
  //    const i = getInfo(ctx)
  //    logger.warn(`[socket] Disconnected ${i.ip} ${i.id} => ${data}`)
  //  })
  //
  //  io.on('error', function (ctx, data) {
  //    const logger = ctx.miolo.logger
  //    const i = getInfo(ctx)
  //    logger.error(`[socket] Error on ${i.ip} ${i.id} => ${data}`)
  //  })
  //
  //
  //  io.attach(app)  

}

export {init_socket}
