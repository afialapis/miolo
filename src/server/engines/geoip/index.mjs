import fs from 'fs'
import {Reader} from '@maxmind/geoip2-node'

let _geoip_reader = undefined

const _geoip_def_local_ips= [
  '127.0.0.1',
  '::1:'
]

function _geoip_is_local(ip, local_ips = []) {
  const all_local_ips = [
      ..._geoip_def_local_ips,
      ...local_ips || []
    ]
  return all_local_ips.indexOf(ip) >= 0
}



function _geoip_init(db = '/var/lib/GeoIP/GeoLite2-City.mmdb', logger= console) {
  try {
    if (_geoip_reader != undefined) {
      return _geoip_reader
    }
    const dbBuffer = fs.readFileSync(db)
    _geoip_reader = Reader.openBuffer(dbBuffer)
    return _geoip_reader
  } catch(error) {
    logger.error(`[geoip] Error initing:`)
    logger.error(error)
    return undefined
  }
}

export const geoip_localize_ip= (ip, config, logger= console) => {
  if (_geoip_is_local(ip, config?.local_ips)) {
    return {
      local: true,
      country: '',
      city: '',
    }      
  }

  try {
    const reader = _geoip_init(config?.db, logger)
    const resp= reader.city(ip)
    return {
      country: resp.country.isoCode,
      city   : resp.city?.names?.en
    }
  } catch(error) {
    logger.error(`[geoip] Error localizing IP ${ip}:`)
    logger.error(error)
  }

  return {
    country: '',
    city: '',
  }  
}
