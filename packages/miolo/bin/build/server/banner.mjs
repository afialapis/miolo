import path from "node:path"
import { readJsonFile } from "../../util.mjs"

export async function miolo_build_banner(pkgPath) {
  const pkgJson = await readJsonFile(path.join(pkgPath, "package.json"))

  return `/**
 * ${pkgJson.name} v${pkgJson.version || "0.0.0"}
 *
 * ${pkgJson?.homepage || pkgJson?.repository?.url || ""}
 *
 * Copyright (c) ${pkgJson?.author || "-no-author-"}
 *
 * This source code is licensed under the ${pkgJson.license || "MIT"} license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license ${pkgJson.license || "MIT"}
 */
/* eslint-disable */ `
}
