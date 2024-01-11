import path from 'path'
import fs from 'fs'
import https from 'https'
//import fetch from 'node-fetch'
import { cyan, green, yellow } from 'tinguir'

const _IPSUM_DEF_FOLDER = '/var/ipsum'
const _IPSUM_FILE_NAME = 'ipsum.txt'
const _IPSUM_REMOTE_FILE = 'https://raw.githubusercontent.com/stamparm/ipsum/master/ipsum.txt'
const _IPSUM_NLISTS = 1

/*function ipsum_download_file(callback, remote_file = _IPSUM_REMOTE_FILE) {
  fetch(remote_file).then(response => {
    response.text().then((content) => {
      callback(content)
    })
  })
}*/


export function ipsum_download_file(callback, remote_file = _IPSUM_REMOTE_FILE, logger) {
  const lerr = logger ? logger.error : console.error

  https.get(remote_file, (res) => {
    const data = []
    res.on('data', (chunk) => {
      data.push(chunk)
    }).on('end', () => {
      let content = Buffer.concat(data).toString()
      callback(content)
    })
  }).on('error', (err) => {
    lerr(`[SERVER][${cyan('IPsum')}] Error downloading remote file (${err.toString()})`)
    callback('')
  })

}

function _ipsum_ips_from_content(content, logger) {
  const lerr = logger ? logger.error : console.error

  if (! content) {
    return []
  }

  try {
    let ips = []
    content
      .split('\n')
      .filter(line => line.indexOf('#') < 0)
      .map(line => {
        const [ip, nlists] = line.split('\t')
        if (parseInt(nlists) >= _IPSUM_NLISTS) {
          ips.push(ip)
        }
      })
    return ips
  } catch(error) {
    lerr(`[SERVER][${cyan('IPsum')}] Error getting IPs from content`)
    return []
  }
}

function _ipsum_ips_from_file(folder= _IPSUM_DEF_FOLDER, logger) {
  const lerr = logger ? logger.error : console.error

  if (! fs.existsSync(folder)) {
    if (logger) {
      lerr(`[SERVER][${cyan('IPsum')}] Folder ${folder} does not exist`)
    }
    return []
  }

  const local_path = path.join(folder, _IPSUM_FILE_NAME)

  if (! fs.existsSync(local_path)) {
    if (logger) {
      lerr(`[SERVER][${cyan('IPsum')}] File ${local_path} does not exist`)
    }
    return []
  }

  const content = fs.readFileSync(local_path, {encoding:'utf8'})  
  return _ipsum_ips_from_content(content, logger)
}


function ipsum_update(folder= _IPSUM_DEF_FOLDER, callback, logger) {
  const lerr = logger ? logger.error : console.error
  const ldbg = logger ? logger.debug : console.log

  if (! fs.existsSync(folder)) {
    lerr(`[SERVER][${cyan('IPsum')}] Folder ${folder} does not exist`)
    return
  }

  try {
    ldbg(`[SERVER][${cyan('IPsum')}] Updating file...`)

    ipsum_download_file((content) => {
      
      const local_path = path.join(folder, _IPSUM_FILE_NAME)
      fs.writeFileSync(local_path, content, {encoding:'utf8', flag:'w'})

      const ntot = content.split('\n').length
      const ips = _ipsum_ips_from_content(content, logger)
      const nfilt = ips.length
      ldbg(`[SERVER][${cyan('IPsum')}] File downloaded. ${ntot} ips on the list (${nfilt} appearing in ${_IPSUM_NLISTS} or more lists)`)
      
      if (callback) {
        callback(ips)
      }
    })
  
  } catch(error) {
    lerr(`[SERVER][${cyan('IPsum')}] Error ${error} updating the file`)
  }
}


export function ipsum_config() {
  return {
    name: 'IPsum',
    cronTime: '0 0 * * *',
    onTick: (miolo, _onCompleted) => {
      const folder = miolo.config.http.ratelimit.ipsum_folder || _IPSUM_DEF_FOLDER
      ipsum_update(folder, (ips) => {
        miolo.logger.info(`[SERVER][${cyan('IPsum')}] File downloaded. ${green(ips.length)} ips will be ${yellow('blacklisted')}!`)
      }, miolo.logger)
    },
    start: true   
  }
}

export function ipsum_read_ips(folder = _IPSUM_DEF_FOLDER, callback, logger) {
  const ldbg = logger ? logger.debug : console.log
  const lwarn = logger ? logger.warn : console.log

  const ips = _ipsum_ips_from_file(folder, logger)
  if (ips.length > 0) {
    if (callback) {
      callback(ips)
    }
    ldbg(`[SERVER][${cyan('IPsum')}] File contains ${ips.length} ips`)
    return ips
  } else {
    lwarn(`[SERVER][${cyan('IPsum')}] File is empty. Launching update...`)
    ipsum_update(folder, callback, logger)
    return []
  }
}
