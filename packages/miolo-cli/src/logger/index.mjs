import Logger from "./Logger.mjs"

export function init_logger(level = "warn") {
  return new Logger(level)
}
