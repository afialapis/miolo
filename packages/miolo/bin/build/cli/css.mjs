import { nanoid } from "nanoid"

export function miolo_add_css_link_to_head(appName, htmlString, dest, suffix) {
  const webDest = dest.startsWith("./")
    ? dest.replace("./", "/")
    : dest.startsWith("/")
      ? dest
      : `/${dest}`

  const linkTag = `  <link href="${webDest}/${appName}.${suffix}.css?v=${nanoid()}" rel="stylesheet" media="all">`

  const headCloseTagRegex = /(<\/head>)/i
  const match = htmlString.match(headCloseTagRegex)

  if (match) {
    console.log(`[${appName}][build] adding css link ${linkTag} to <head>`)
    return htmlString.replace(headCloseTagRegex, `${linkTag}\n$&`)
  } else {
    console.warn(`[${appName}][build] No se encontró la etiqueta <head> en el HTML proporcionado.`)
    return htmlString
  }
}
