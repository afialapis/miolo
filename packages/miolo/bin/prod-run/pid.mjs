import {writeFileSync, readFileSync} from 'node:fs'

export function pidFileCreate(appName) {
  const pidFilePath = `/tmp/${appName}.pid`
  writeFileSync(pidFilePath, `${process.pid}`, {encoding:'utf8',flag:'w'})
  return process.pid
}

export function pidFileRead(appName) {
  const pidFilePath = `/tmp/${appName}.pid`
  const pid = readFileSync(pidFilePath, {encoding:'utf8'})
  return pid
}