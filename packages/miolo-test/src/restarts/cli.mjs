import { miolo_client } from "miolo-cli"

export function test_miolo_client() {
  const { fetcher } = miolo_client({
    config: {
      hostname: "localhost",
      port: 8001,
      force_hostname: true,
      silent_fail: true
    }
  })
  return fetcher
}
