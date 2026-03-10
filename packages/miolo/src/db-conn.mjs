import { dropConnections, getConnection } from "calustra"
import { init_config } from "./config/index.mjs"
import { init_logger } from "./engines/logger/index.mjs"
import { miolo_cacher_options_for_calustra } from "./middleware/context/cache/options.mjs"

export async function miolo_db_connection_pg(makeConfig, options = undefined) {
  const config = init_config(makeConfig)

  // init logger first
  const logger = init_logger(config.log, undefined, config?.name)

  if (config.db.config.dialect === "sqlite") {
    logger.error(`[miolo] SQLite is not supported yet`)
    return undefined
  }

  // parse db options
  const dbOptions = {
    ...config.db.options,
    ...(options || {}),
    log: logger,
    cache: miolo_cacher_options_for_calustra(config, logger)
  }

  const conn = await getConnection(config.db.config, dbOptions)

  conn.get_model = conn.getModel

  return conn
}

export async function miolo_db_drop_connections() {
  await dropConnections()
}
