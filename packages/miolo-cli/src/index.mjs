import { init_catcher } from "./catcher/index.mjs"
import { init_fetcher } from "./fetcher/index.mjs"
import { init_logger } from "./logger/index.mjs"
import { init_socket } from "./socket/index.mjs"

export function miolo_client(context) {
  const { config } = context
  const logger = init_logger(config?.log_level || "warn")

  logger.verbose(`[miolo-cli] init_fetcher`)
  const fetcher = init_fetcher(config)

  if (config?.catcher_url) {
    logger.verbose(`[miolo-cli] init_catcher at ${config?.catcher_url}`)
    init_catcher(config?.catcher_url, fetcher)
  }

  let socket
  if (config?.socket?.enabled === true) {
    logger.verbose(`[miolo-cli] init_socket at ${config?.socket?.url || "default url"}`)
    const url = config?.socket?.url
    const options = config?.socket?.options
    socket = init_socket(url, options)
  }

  const miolo_obj = {
    logger,
    fetcher,
    socket
  }

  return miolo_obj
}
