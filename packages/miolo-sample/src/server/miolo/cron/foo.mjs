import { blue } from 'tinguir'

export const onTickFoo = async (miolo) => {
  miolo.logger.info(`${blue('[cron][foo]')} Fooing...`)
  
  miolo.logger.info(`${blue('[cron][foo]')} Foo done!`)
}
