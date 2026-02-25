import path from 'path'
import { existsSync } from 'node:fs';
import {readJsonFileSync} from './util.mjs'
import alias_plugin from '@rollup/plugin-alias';


function _aliasesRead (pkgPath, resolvePaths= false) {
  try {

    const jsonFile = path.join(pkgPath, 'jsconfig.json')
    if (! existsSync(jsonFile)) {
      return [undefined, undefined]
    }
    const jsConf = readJsonFileSync(jsonFile)
    const rpaths = jsConf?.compilerOptions?.paths
    if (rpaths==undefined) {
      return [undefined, undefined]
    }
    const baseUrl= jsConf?.compilerOptions?.baseUrl || '.'
    let aliases= {}
    Object.keys(rpaths).map(alias => {
      const rpath= rpaths[alias][0]
      aliases[alias]= resolvePaths
        ? path.join(pkgPath, baseUrl, rpath)
        : rpath

      // Seems wildcards in jsconfig.json are not allowed, but necessary
      //   to make IDE's file jumping work.
      //
      // if (alias.indexOf('*')>=0) {
      //   console.error(`[xeira] Aliases error: ${cerror("don't use wildcards on aliases, it may not work here")}.`)
      // }
    })
    return [baseUrl, aliases]
  } catch(e) {
    console.error(`[xeira] Error searching aliases:`)
    console.error(e)
  }
  return [undefined, undefined]
}


function hasAliases(pkgPath) {
  const [_baseUrl, aliases] = _aliasesRead(pkgPath)
  if (!aliases) {
    return false
  }
  return true
}

function getBabelPluginForResolvingAliases (context) { 
  const [baseUrl, aliases] = _aliasesRead(context.pkgPath, false)
  if (!aliases) {
    return undefined
  }

  //const aliasNames= Object.keys(aliases)
  const rootFolder= path.join(context.pkgPath, baseUrl)

  console.log(`[aliases] Adding aliases. Root [${baseUrl}]. Aliases ${JSON.stringify(aliases)}`)

  const plugin=
    ['babel-plugin-module-resolver', {
      "root": [rootFolder],
      "alias": aliases,
      //      resolvePath: (sourcePath, currentFile, opts) => {
      //        /**
      //         * The `opts` argument is the options object that is passed through the Babel config.
      //         * opts = {
      //         *   extensions: [".js"],
      //         *   resolvePath: ...,
      //         * }
      //         */
      //        let rPath= resolvePath(sourcePath, currentFile, opts)
      //
      //        // relativize paths
      //        for (const alias of aliasNames) {
      //          if (sourcePath.indexOf(alias)==0) {
      //            rPath= rPath.replace(opts.root, '.')
      //          }
      //        }
      //        
      //        // console.log(`resolving ${sourcePath} ${currentFile} ${JSON.stringify(opts) }==> ${rPath}`)
      //        return rPath
      //      }

    }]
  
  return plugin
}


function getRollupPluginForResolvingAliases (pkgPath) { 
  const [_baseUrl, aliases] = _aliasesRead(pkgPath, true)
  if (!aliases) {
    return []
  }

  let entries= []

  Object.keys(aliases).map(alias => {
    const fullPath= aliases[alias]
    const relPath= path.relative(pkgPath, fullPath)
    entries.push({
      find: alias, replacement: relPath
    })
  })

  const plugin= alias_plugin({
    entries
  })
  
  return [plugin]
}


export {hasAliases, getBabelPluginForResolvingAliases, getRollupPluginForResolvingAliases}