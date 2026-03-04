import { format } from "winston"

const injectStackTrace = format((info) => {
  // Solo nos interesa inyectar stack si es nivel error y NO tiene stack
  if (info.level === "error" && !info.stack) {
    const syntheticError = new Error(info.message)
    const stackLines = syntheticError.stack.split("\n")

    // 1. Definimos nuestro "Ancla".
    // Es el archivo que actúa de frontera entre tu framework y el código de negocio.
    // Usamos una cadena parcial única para identificarlo.
    // DEV:  'src/engines/logger/index.mjs'
    // PROD: ''

    // 2. Buscamos en qué línea del stack aparece tu wrapper
    let wrapperIndex = stackLines.findIndex((line) => line.includes("src/engines/logger/index.mjs"))
    if (wrapperIndex === -1) {
      for (const [lidx, l] of stackLines.entries()) {
        if (
          l.includes(
            `${process.env.MIOLO_NAME || "miolo"}.${process.env.MIOLO_BUILD_SERVER_EXT || "node.bundle.mjs"}`
          )
        ) {
          const segs = ["Format.transform", "DerivedLogger"]
          segs.forEach((seg) => {
            if (l.includes(seg)) {
              wrapperIndex = lidx
            }
          })
        }
      }
    }

    let cleanStackLines = stackLines

    if (wrapperIndex !== -1) {
      // CASO ÉXITO: Encontramos tu wrapper.
      // El stack útil empieza justo en la línea SIGUIENTE (+1).
      // Mantenemos la cabecera (línea 0) y pegamos del wrapper hacia abajo.
      cleanStackLines = [stackLines[0], ...stackLines.slice(wrapperIndex + 1)]
    }
    // FALLBACK: Si por alguna razón extraña no pasa por tu wrapper,
    // hacemos una limpieza conservadora básica (winston y node internals).
    cleanStackLines = cleanStackLines.filter(
      (line) =>
        !line.includes("node_modules/winston") &&
        !line.includes("node_modules/logform") &&
        !line.includes("node_modules/koa-compose") &&
        !line.includes("node:internal") &&
        !line.includes("node_modules/readable-stream") &&
        !line.includes("injectStackTrace.mjs")
    )

    info.stack = cleanStackLines.join("\n")
  }
  return info
})

export default injectStackTrace
