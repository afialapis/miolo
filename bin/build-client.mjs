
import {xeiraBundle} from 'xeira'
import { cleanFolder, copyFileSync, getAppName } from './util.mjs'

process.env.NODE_ENV = 'production'

const BUNDLE_SUFFIX = 'iife.bundle.min'

function _addCssLinkToHead(htmlString) {
  const linkTag = `  <link href="/dist/cli/${getAppName()}.${BUNDLE_SUFFIX}.css" rel="stylesheet" media="all">`
  
  // Expresión regular para encontrar la etiqueta </head> de cierre.
  // Usamos un grupo de captura para mantener el contenido antes de </head>.
  const headCloseTagRegex = /(<\/head>)/i;

  // Busca la etiqueta </head> en el HTML.
  const match = htmlString.match(headCloseTagRegex);

  if (match) {
    // Si se encuentra </head>, inserta la etiqueta <link> justo antes de ella.
    return htmlString.replace(headCloseTagRegex, `${linkTag}\n$&`);
  } else {
    // Si no se encuentra </head>, devuelve el HTML original sin modificar.
    console.warn(`[miolo] No se encontró la etiqueta <head> en el HTML proporcionado.`);
    return htmlString;
  }
}


export default async function(appName, entry, htmlFile, dest) {
  console.log(`[${appName}][prod] Building client from entry ${entry}`)
  cleanFolder(dest)

  //fs.copyFileSync(proot('./cli/index.html'), proot('./build/cli/index.html'))
  copyFileSync(htmlFile, `${dest}/index.html`, _addCssLinkToHead)

  await xeiraBundle({
    source_index: entry,
    target: 'browser',
    bundle_folder: dest,
    bundle_name: appName,
    bundle_extension: BUNDLE_SUFFIX,
    bundler: 'rollup',
    bundle_node_polyfill: true
  })
}