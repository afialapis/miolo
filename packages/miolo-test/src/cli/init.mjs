import { miolo_client } from "miolo-cli"

let fetcher

export function test_cli_init() {
  const miolo_cli = miolo_client({
    config: {
      hostname: "localhost",
      port: 8001,
      force_hostname: true,
      silent_fail: true
    }
  })
  fetcher = miolo_cli.fetcher
  return fetcher
}
