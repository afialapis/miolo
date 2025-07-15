import { io } from "socket.io-client";

export function init_socket(domain, options) {
  const socket = io(domain, options)
  return socket
}