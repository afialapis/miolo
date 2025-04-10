import path from 'node:path'

export default async function({ appName, entry, serverName }) {
  console.log(`[${appName}][dev] Running DEV server ${serverName} from entry ${entry}`)
  const srv_module = await import(path.join(process.cwd(), entry))
  const server = srv_module[serverName]
  await server()  
}