import IO from 'koa-socket-2'
import { blue } from 'farrapa-colors'

function init_socket(logger) {

  const getInfo = (ctx) => {
    let i= {id: '', ip: ''}
    try { 
      i.id = ctx.socket.id
    } catch (e) {}
    try {
      i.ip = ctx.socket.handshake.address
    } catch (e) {}
    return i
  }

  const io = new IO({ origins: '*:*'})

  io.on('connection', function (ctx, _data) {
    const i= getInfo(ctx)
    logger.debug(`${blue('SOCKET')} Connection from ${i.ip} ${i.id}`)
  })

  io.on('disconnect', function (ctx, data) {
    const i = getInfo(ctx)
    logger.debug(`${blue('SOCKET')} Disconnected ${i.ip} ${i.id} => ${data}`)
  })

  io.on('error', function (ctx, data) {
    const i = getInfo(ctx)
    logger.error(`${blue('SOCKET')} Error on ${i.ip} ${i.id} => ${data}`)
  })

  return io

}

export {init_socket}
