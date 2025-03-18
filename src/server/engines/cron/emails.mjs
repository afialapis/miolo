export function sys_email_queue_config() {
  return {
    name: 'Emailer',
    cronTime: '* * * * *',
    onTick: (miolo, _onCompleted) => {
      miolo.emailer.queue_send_emails(miolo.logger)
    },
    start: true   
  }
}