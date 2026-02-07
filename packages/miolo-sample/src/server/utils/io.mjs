import { readdir } from 'fs';

function readDirAsync(path) {
  return new Promise(function (resolve, reject) {
    readdir(path, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export {readDirAsync}