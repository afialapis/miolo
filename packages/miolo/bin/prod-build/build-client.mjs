
import path from 'node:path'
import {xeiraBundle} from 'xeira'
import { nanoid } from 'nanoid'
import { cleanFolder, copyFileSync, isFileExistingSync } from '../util.mjs'

function _addCssLinkToHead(appName, htmlString, dest) {
  
  const webDest = dest.startsWith('./') 
    ? dest.replace('./', '/')
    : dest.startsWith('/') 
    ? dest
    : `/${dest}`

  const linkTag = `  <link href="${webDest}/${appName}.${process.env.MIOLO_BUILD_CLIENT_SUFFIX}.css?v=${nanoid()}" rel="stylesheet" media="all">`
  
  // Expresión regular para encontrar la etiqueta </head> de cierre.
  // Usamos un grupo de captura para mantener el contenido antes de </head>.
  const headCloseTagRegex = /(<\/head>)/i;

  // Busca la etiqueta </head> en el HTML.
  const match = htmlString.match(headCloseTagRegex);

  if (match) {
    console.log(`[${appName}][prod] adding css link ${linkTag} to <head>`)

    // Si se encuentra </head>, inserta la etiqueta <link> justo antes de ella.
    return htmlString.replace(headCloseTagRegex, `${linkTag}\n$&`);
  } else {
    // Si no se encuentra </head>, devuelve el HTML original sin modificar.
    console.warn(`[${appName}][prod] No se encontró la etiqueta <head> en el HTML proporcionado.`);
    return htmlString;
  }
}


export default async function(appName, entry, htmlFile, dest) {
  console.log(`[${appName}][prod] Building client from entry ${entry}`)

  // Clean dest folder
  cleanFolder(dest)
  
  // Build client
  await xeiraBundle({
    source_index: entry,
    target: 'browser',
    bundle_folder: dest,
    bundle_name: appName,
    bundle_extension: process.env.MIOLO_BUILD_CLIENT_SUFFIX,
    bundler: 'rollup',
    bundle_node_polyfill: true
  })

  // Fix css file
  const destCssFile = `${dest}/${appName}.${process.env.MIOLO_BUILD_CLIENT_SUFFIX}.css`
  const destCssFileExists = isFileExistingSync(destCssFile)

  console.log(`[${appName}][prod] destCssFile ${destCssFile} exists?: ${destCssFileExists}`)
  
  console.log(`[${appName}][prod] Copying HTML file ${htmlFile} to ${dest}/index.html`)
  copyFileSync(path.join(process.cwd(), htmlFile), path.join(process.cwd(), `${dest}/index.html`), (content) => {
    if (destCssFileExists) {
      content = _addCssLinkToHead(appName, content, dest)
    }
    return content
  })
  
}