/**
 * https://gist.github.com/suprememoocow/5133080
 * 
 * https://github.com/winstonjs/winston/issues/943
 * 
 * A function for reopening a winston File logging transport post logrotation on a HUP signal.
 * To send a HUP to your node service, use the postrotate configuration option from logrotate. 
 *   `postrotate kill -HUP ‘cat /var/run/mynodeservice.pid‘`
 */
import path from 'path'
import fs from 'fs'

export function reopenTransportOnHupSignal(fileTransport) {
  process.on('SIGHUP', function() {    

    const fullname = path.join(fileTransport.dirname, fileTransport._getFile(false))

    console.log(`[miolo][file-logger] SIGHUP received. Check if we need to re-open log file ${fullname}...`)

    function reopen() {
      console.log(`[miolo][file-logger] Reopening ${fullname}...`)
      try {
        if (fileTransport._stream) {
          fileTransport._stream.end()
          fileTransport._stream.destroySoon()
        }

        let stream = fs.createWriteStream(fullname, fileTransport.options)
        stream.setMaxListeners(Infinity)

        fileTransport._size = 0
        fileTransport._stream = stream

        fileTransport.once('flush', function () {
          fileTransport.opening = false
          fileTransport.emit('open', fullname)
        })

        fileTransport.flush()

        console.log(`[miolo][file-logger] Reopened ${fullname} successfully`)
      } catch(error) {
        console.error(`[miolo][file-logger] Error reopening ${fullname}: ${error.toString()}`)
      }
    }

    fs.stat(fullname, function (err) {
      if (err && err.code == 'ENOENT') {
        return reopen()
      }
    })

  })
}