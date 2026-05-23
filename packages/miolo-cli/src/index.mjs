import { init_catcher } from "./catcher/index.mjs"
import { init_fetcher } from "./fetcher/index.mjs"
import { init_socket } from "./socket/index.mjs"

export function miolo_client(context) {
  const { config } = context

  console.log(`[miolo-cli] init_fetcher`)
  const fetcher = init_fetcher(config)

  if (config?.catcher_url) {
    console.log(`[miolo-cli] init_catcher at ${config?.catcher_url}`)
    init_catcher(config?.catcher_url, fetcher)
  }

  let socket
  if (config?.socket?.enabled === true) {
    console.log(`[miolo-cli] init_socket at ${config?.socket?.url || "default url"}`)
    const url = config?.socket?.url
    const options = config?.socket?.options
    socket = init_socket(url, options)
  }

  const miolo_obj = {
    fetcher,
    socket
  }

  return miolo_obj
}
