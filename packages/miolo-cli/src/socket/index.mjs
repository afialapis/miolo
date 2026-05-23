import { io } from "socket.io-client"

export function init_socket(url, options) {
  const socket = io(url, options)
  return socket
}
