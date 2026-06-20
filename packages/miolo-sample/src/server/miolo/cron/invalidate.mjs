import { blue } from "tinguir"

export const cacheInvalidate = async (miolo) => {
  miolo.logger.info(`${blue("[cron][cache_invalidate]")} Invalidating cache...`)

  // broadcast an event to all clients
  miolo.io.emit("ssr-invalidate", { name: "todos" })

  miolo.logger.info(`${blue("[cron][cache_invalidate]")} Cache invalidated!`)
}
