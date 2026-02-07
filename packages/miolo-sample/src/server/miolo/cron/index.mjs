
import {onTickFoo} from './foo.mjs'

// check https://github.com/kelektiv/node-cron#readme
//
// https://crontab.guru/

export default function init_cron() {

  let cronList = []

  cronList.push({
    name: 'miolo-sample-foo',
    cronTime: '* */30 * * * *',
    onTick: onTickFoo,
    start: true
  })

  console.log(`[miolo-sample][cron] ${cronList.length} custom cron jobs loaded`)

  return cronList
}
