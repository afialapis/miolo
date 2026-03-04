import tailwindVite from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { miolo_build_client } from "./client.mjs"
import { miolo_build_ssr } from "./ssr.mjs"

export async function miolo_build_cli(
  appName,
  pkgPath,
  config,
  cliEntry,
  cliDest,
  cliSuffix,
  htmlFile,
  ssrEntry,
  ssrDest
) {
  // Vite config merge
  const viteConfig = config.build.vite || {}

  const baseViteConfig = {
    appType: "custom",
    plugins: [
      react({
        babel: {
          plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
        }
      }),
      tailwindVite()
    ],
    base: viteConfig.base || "/",
    root: viteConfig.root || pkgPath,
    ...viteConfig
  }

  // SSR files
  await miolo_build_ssr(appName, pkgPath, baseViteConfig, config.build.ssr, ssrEntry, ssrDest)

  // Client files
  await miolo_build_client(appName, pkgPath, baseViteConfig, cliEntry, htmlFile, cliDest, cliSuffix)
}
