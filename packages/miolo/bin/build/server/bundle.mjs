import { rollup } from 'rollup'
import { green, red, yellow } from 'tinguir'

let cache

async function _rollupGenerateOutputs(bundle, outputOptionsList) {
  for (const outputOptions of outputOptionsList) {
    
    const { _output } = await bundle.write(outputOptions);

    /*
    // generate output specific code in-memory
    // you can call this function multiple times on the same bundle object
    // replace bundle.generate with bundle.write to directly write to disk    
    const { output } = await bundle.generate(outputOptions);
    
    for (const chunkOrAsset of output) {
      if (chunkOrAsset.type === 'asset') {
        // For assets, this contains
        // {
        //   fileName: string,              // the asset file name
        //   source: string | Uint8Array    // the asset source
        //   type: 'asset'                  // signifies that this is an asset
        // }
        console.log('Asset', chunkOrAsset);
      } else {
        // For chunks, this contains
        // {
        //   code: string,                  // the generated JS code
        //   dynamicImports: string[],      // external modules imported dynamically by the chunk
        //   exports: string[],             // exported variable names
        //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
        //   fileName: string,              // the chunk file name
        //   implicitlyLoadedBefore: string[]; // entries that should only be loaded after this chunk
        //   imports: string[],             // external modules imported statically by the chunk
        //   importedBindings: {[imported: string]: string[]} // imported bindings per dependency
        //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
        //   isEntry: boolean,              // is this chunk a static entry point
        //   isImplicitEntry: boolean,      // should this chunk only be loaded after other chunks
        //   map: string | null,            // sourcemaps if present
        //   modules: {                     // information about the modules in this chunk
        //     [id: string]: {
        //       renderedExports: string[]; // exported variable names that were included
        //       removedExports: string[];  // exported variable names that were removed
        //       renderedLength: number;    // the length of the remaining code in this module
        //       originalLength: number;    // the original length of the code in this module
        //       code: string | null;       // remaining code in this module
        //     };
        //   },
        //   name: string                   // the name of this chunk as used in naming patterns
        //   referencedFiles: string[]      // files referenced via import.meta.ROLLUP_FILE_URL_<id>
        //   type: 'chunk',                 // signifies that this is a chunk
        // }
        console.log('Chunk', chunkOrAsset.modules);
      }
    }
    */
    
  }

      
}

export async function miolo_bundle(appName, pkgPath, inputOptions, outputOptionsList, watch= false) {
  let bundle
  let buildFailed = false
  let niceFileName = ''

  try {
    try {
      niceFileName= outputOptionsList[0].file.replace(pkgPath, '.')
    } catch(_) {
      try {
        niceFileName= outputOptionsList[0].dir.replace(pkgPath, '.')
      } catch(_) {
        niceFileName= JSON.stringify(outputOptionsList[0])
      }      
    }

    if (watch) {
      inputOptions.cache = cache
    }

    // create a bundle
    const bundle = await rollup(inputOptions)

    if (watch) {
      cache = bundle.cache
    }

    await _rollupGenerateOutputs(bundle, outputOptionsList);
  } catch (error) {
    buildFailed = true;
    // do some error reporting
    console.error(red(error))
    console.trace()
  }
  if (bundle) {
    // closes the bundle
    await bundle.close();
  }

  if (buildFailed) {
    console.error(`[${appName}][build] Error when bundling ${yellow(niceFileName)}`)
    process.exit(1)
  } else {
    
    console.log(`[${appName}][build] Bundled ${yellow(niceFileName)} ${green('successfully!')}`)
  }
}

