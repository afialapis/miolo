import fs from 'fs'
import {Reader} from '@maxmind/geoip2-node'

let _geoip_reader = undefined

let _geoip_local_ips= [
  '127.0.0.1'
]

function _geoip_init(db = '/var/lib/GeoIP/GeoLite2-City.mmdb', local_ips = ['127.0.0.1'], logger= console) {
  try {
    if (_geoip_reader != undefined) {
      return _geoip_reader
    }

    _geoip_local_ips = [
      ..._geoip_local_ips,
      ...local_ips || []
    ]
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
  console.log(_geoip_local_ips)
  console.log(ip)
  if (_geoip_local_ips.indexOf(ip) >= 0) {
    return {
      local: true,
      country: '',
      city: '',
    }      
  }

  try {
    const reader = _geoip_init(config?.db, config?.local_ipds, logger)
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
