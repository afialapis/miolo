import passport from "./auth/passport.mjs"
import cache from "./cache/index.mjs"
import init_cron from "./cron/index.mjs"
import db from "./db.mjs"
import http from "./http.mjs"
import routes from "./routes/index.mjs"
import socket from "./socket.mjs"
import { loader } from "./ssr/loader.mjs"

export default () => {
  return {
    name: "miolo-sample",
    http,
    auth: {
      passport
    },
    db,
    routes,
    cache,
    build: {
      ssr: { loader }
    },
    cron: init_cron(),
    socket
  }
}
