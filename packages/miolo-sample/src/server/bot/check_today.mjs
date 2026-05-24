import { intre_now, intre_pretty_long } from "intre"

function check_today() {
  const now = intre_now()
  const today = intre_pretty_long(now)
  console.log(`[miolo-sample][check_today] Today is ${today}`)
  return today
}

check_today()
