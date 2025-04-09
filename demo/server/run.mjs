import { miolo_demo_server } from "./server.mjs";

let authType= 'credentials'
try {
  authType= process.argv[2].replace('--', '')
} catch(_) {}

console.log(`[miolo-demo-${authType}][server] Starting...`)
miolo_demo_server(authType)
