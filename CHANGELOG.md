# 0.10.3
- fix config `geoip.local_ipds` typo
- fix and make `geoip.local_ips` do something

# 0.10.2
- Rely on miolo settings for cached session's ttl

# 0.10.1
- session using cacheiro
- lowercase methods, best demo scripts
- cache options for calustra and custom
- fix demo

# 0.10.0
- upgraded calustra, getConnection/getModel are async

# 0.9.37
- little ctx.ip fix


# 0.9.23
- clean logs

# 0.9.22
- added http.request.geoip

# 0.9.21
- better option: http.request

# 0.9.20

- extra middlewares receiving `(ctx, next)`

# 0.9.19

- logger prefix using config.name
- configurable request times coloring
- save request.times: {
    elapsed (float, seconds),
    description ('ok', 'lazy' or 'slow')
  }

# 0.9.18

- Cleaned some console.log on cron.
- Router try{catch}s

# 0.9.17

- Fixed useSsrData(.... modifier) parameter


# 0.9.16

- Added useSsrData(.... modifier) parameter
