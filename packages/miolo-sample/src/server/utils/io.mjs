import { readdir } from "fs"

function readDirAsync(path) {
  return new Promise((resolve, reject) => {
    readdir(path, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

export { readDirAsync }
