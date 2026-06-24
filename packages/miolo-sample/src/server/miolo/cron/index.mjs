import { autoTodosInsert } from "./auto-todos.mjs"
import { onTickFoo } from "./foo.mjs"

// check https://github.com/kelektiv/node-cron#readme
//
// https://crontab.guru/

export default function init_cron() {
  const cronList = []

  cronList.push({
    name: "miolo-sample-foo",
    cronTime: "*/30 * * * *",
    onTick: onTickFoo,
    start: true
  })

  cronList.push({
    name: "miolo-sample-auto-todos",
    cronTime: "*/1 * * * *",
    onTick: autoTodosInsert,
    start: true
  })

  console.log(`[miolo-sample][cron] ${cronList.length} custom cron jobs loaded`)

  return cronList
}
