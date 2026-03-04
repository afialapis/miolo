#!/usr/bin/env node
import yargs from "yargs-parser"
import { init_env_config } from "../src/config/env.mjs"

async function main() {
  const args = yargs(process.argv.slice(2))
  const command = args._[0]

  try {
    // Special handling for 'create' command - doesn't need env config
    if (command === "create") {
      const createAppName = args._[1]
      const createOptions = {
        port: args.port,
        auth: args.auth,
        dest: args.d || args.dest // Support both --d and --dest
      }

      const createAppHandler = (await import("./create/index.mjs")).default
      await createAppHandler(createAppName, createOptions)
      return
    }

    // Init env for other commands
    process.env.NODE_ENV = "production"
    init_env_config()

    // Init vars
    const appName = args["app-name"] || process.env.MIOLO_NAME || "miolo"
    const cliEntry =
      args["cli-entry"] || process.env.MIOLO_BUILD_CLIENT_ENTRY || "./src/cli/entry-cli.jsx"
    const cliDest = args["cli-dest"] || process.env.MIOLO_BUILD_CLIENT_DEST || "./build/cli"
    const cliSuffix =
      args["cli-suffix"] || process.env.MIOLO_BUILD_CLIENT_SUFFIX || "iife.bundle.min"
    const htmlFile =
      args["html-file"] || process.env.MIOLO_BUILD_HTML_FILE || "./src/cli/index.html"
    const srvEntry =
      args["server-entry"] || process.env.MIOLO_BUILD_SERVER_ENTRY || "./src/server/server.mjs"
    const configEntry =
      args["config-entry"] || process.env.MIOLO_BUILD_CONFIG_ENTRY || "./src/server/config.mjs"
    const srvDest = args["server-dest"] || process.env.MIOLO_BUILD_SERVER_DEST || "./build/server"
    const srvExt = args["server-ext"] || process.env.MIOLO_BUILD_SERVER_EXT || "node.bundle.mjs"
    const ssrEntry = args["ssr-entry"] || process.env.MIOLO_BUILD_SERVER_SSR_ENTRY
    const ssrDest = args["ssr-dest"] || process.env.MIOLO_BUILD_SERVER_DEST || "./build/server"

    switch (command) {
      case "dev": {
        process.env.NODE_ENV = "development"
        const devHandler = (await import("./dev/dev.mjs")).default
        await devHandler(appName)
        break
      }

      case "deb": {
        process.env.NODE_ENV = "development"
        const debHandler = (await import("./dev/dev.mjs")).default
        await debHandler(appName, true)
        break
      }

      case "build": {
        const buildHandler = (await import("./build/build.mjs")).default
        await buildHandler(
          appName,
          cliEntry,
          cliDest,
          cliSuffix,
          htmlFile,
          srvEntry,
          configEntry,
          srvDest,
          srvExt,
          ssrEntry,
          ssrDest
        )
        break
      }

      case "start": {
        const startHandler = (await import("./run/start.mjs")).default
        await startHandler(appName, srvDest, srvExt)
        break
      }

      case "stop": {
        const stopHandler = (await import("./run/stop.mjs")).default
        await stopHandler(appName)
        break
      }

      case "restart": {
        const restartHandler = (await import("./run/restart.mjs")).default
        await restartHandler(appName, srvDest, srvExt)
        break
      }

      case "create-bin": {
        const createHandler = (await import("./prod-bin/create-bin.mjs")).default
        await createHandler(appName, srvDest, srvExt)
        break
      }

      default:
        console.error(`[miolo] Unknown command: ${command}`)
        console.log(
          "[miolo] Available commands: create, dev, deb, build, start, stop, restart, create-bin"
        )
        process.exit(1)
    }
  } catch (error) {
    console.error("[miolo] Error during command execution:", error)
    process.exit(1)
  }
}

main()
