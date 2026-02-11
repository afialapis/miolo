export function sys_email_queue_config() {
  return {
    name: 'Emailer',
    cronTime: '* * * * *',
    onTick: async (miolo, _onCompleted) => {

      const n = await miolo.emailer.queue_send_emails(miolo.logger)
      if (n == -1) {
        miolo.logger.error(`[emailer] Error sending emails`)
      } else {
        miolo.logger.verbose(`[emailer] Sent ${n} emails`)
      }
    },
    start: true   
  }
}