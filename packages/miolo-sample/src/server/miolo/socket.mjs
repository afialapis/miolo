import { COMMON_CACHE_NS } from "./cache/ns.mjs"

export default {
  enabled: true,
  namespaces: [
    {
      name: "todos-update",
      listener: (data) => {
        console.log("TODOS UPDATED!!!")
        console.log(data)
      }
    },
    {
      name: "ping",
      listener: (data) => {
        console.log("PING!!!")
        console.log(data)
      }
    }
  ],
  ssr: {
    enabled: true,
    namespace: COMMON_CACHE_NS
  }
}
