import path from 'node:path'
import json from '@rollup/plugin-json'
import {babel} from '@rollup/plugin-babel'
//import babel from '@rollup/plugin-swc'
import externals from 'rollup-plugin-node-externals'
import replace from '@rollup/plugin-replace'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import scss from 'rollup-plugin-postcss'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

import { rollupBanner } from './banner.mjs'
import { getRollupPluginForResolvingAliases } from './aliases.mjs'
import BABEL_CONFIG from './babel.config.js'

const NODE_ENV = process.env?.NODE_ENV || 'production'

export async function rollupOptionsForEsmNode(pkgPath, pkgJson, input, bundleDeps= false) {

  const inputOptions= {
    input,
    plugins: [
      replace({
        preventAssignment: true,
        'global.process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      }),
      babel(BABEL_CONFIG), 
      commonjs({
        esmExternals: true
      }),      
      ...getRollupPluginForResolvingAliases(pkgPath),
      json(),
      externals({
        packagePath: path.join(pkgPath, 'package.json'),
        deps: !bundleDeps,
        peerDeps: !bundleDeps
      }),
      nodeResolve({
        rootDir: pkgPath,
        exportConditions: ['node'],
      }),

      scss({
        extract: true,
        plugins: [
          tailwindcss({base: pkgPath}),
          autoprefixer()
        ],
        use: {
          sass: {
            silenceDeprecations: ['legacy-js-api'],
          }
        }        
      })
    ],
    onwarn : (warning) => {
      if (warning.code === 'CIRCULAR_DEPENDENCY')    return;
      console.warn(warning.message)
    }
  }

  const outputFile = path.join(pkgPath, process.env.MIOLO_BUILD_SERVER_DEST, bundleDeps 
     ? `${pkgJson.name}.node.bundle.mjs`
     : `${pkgJson.name}.node.bundle.mjs`
  )
  

  const outputs= [
    {
      file: outputFile,
      inlineDynamicImports: true,
      format: 'esm',
      exports: 'named',
      banner: rollupBanner(pkgJson)
    }
  ]

  return[inputOptions, outputs]
}
