import fsPromises from 'fs/promises'
import {readFileSync} from 'fs'

export async function readJsonFile(jsonPath) {
  try {
    const data = await fsPromises.readFile(jsonPath)
    const obj = JSON.parse(data)
    return obj
  } catch (err){
    console.error(`readJsonFile${jsonPath}`, err)
    return {}
  }
}


export function readJsonFileSync(jsonPath, silent= false) {
  try {
    const data = readFileSync(jsonPath, {encoding:'utf8', flag:'r'})
    const obj = JSON.parse(data)
    return obj
  } catch (err){
    if (!silent) {
      console.error(`readJsonFileSync${jsonPath}`, err)
    }
    return {}
  }
}
