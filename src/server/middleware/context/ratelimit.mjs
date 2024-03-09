import ratelimit from 'koa-ratelimit'
import { yellow, magenta } from 'tinguir'
import { ipsum_read_ips } from '../../engines/cron/ipsum.mjs'
import { CUSTOM_BLACKLIST_IPS } from './custom_blacklist.mjs'



function init_rate_limit_middleware(app, config) {
  /* eslint-disable no-unused-vars */
  const miolo= app.context.miolo

  const _get_ip = (ctx) => ctx.headers["x-real-ip"] || ctx.headers["x-orig-ip"] || ctx.ip || '127.0.0.1'

  const ipsum_ips = ipsum_read_ips(config?.ipsum_folder, undefined, miolo.logger)

  const _def_whitelist = (ctx) => {
    const ips = config?.whitelist_ips || []
    if (ips) {
      return ips.indexOf(_get_ip(ctx))>=0
    }
    return false
  }

  const _def_blacklist = (ctx) => {
    const ip = _get_ip(ctx)
    const ips = [
      ... ipsum_ips,
      ... CUSTOM_BLACKLIST_IPS,
      ... config?.blacklist_ips || []
    ]
    
    const doit = ips.indexOf(ip)>=0

    if (doit) {
      ctx.miolo.logger.info(`Rejecting ${yellow('blacklisted')} ${magenta(ip)}`)
    }

    return doit
  }

  const rateLimitDB = new Map()

  const rateLimitConfig = {
    driver: 'memory',
    db: rateLimitDB,

    id: _get_ip,
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-Limit-Total'
    },
    disableHeader: false,

    max: config?.max || 1000,
    duration: config?.duration || 60 * 1000,
    errorMessage: config?.errorMessage || 'Rate Limit reached',

    whitelist: config?.whitelist || _def_whitelist,
    blacklist: config?.blacklist || _def_blacklist
  }

  app.use(ratelimit(rateLimitConfig))
}

export {init_rate_limit_middleware}
