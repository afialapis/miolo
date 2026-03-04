// "use strict";

import util from "node:util"
import { uncolor } from "tinguir"
import winston from "winston"
import buildErrorEmailBody from "./buildErrorEmailBody.mjs"

function init_logger_to_mail(config, emailer) {
  const MailerLogger = function (options) {
    winston.Transport.call(this, options)
    options = options || {}

    this.level = config.level || "info"
    this.ename = config?.name || emailer.defaults.name
    this.to = config.to || emailer.defaults.to
    this.from = config.from || emailer.defaults.from
    this.humanReadableUnhandledException = options.humanReadableUnhandledException || true
    this.handleExceptions = options.handleExceptions || true
    this.json = options.json || false
    this.colorize = options.colorize || false
  }

  /** @extends winston.Transport */
  util.inherits(MailerLogger, winston.Transport)

  //
  // Expose the name of this Transport on the prototype
  //
  MailerLogger.prototype.name = "MailerLogger"

  MailerLogger.prototype.log = function (info, callback) {
    let title = ""
    try {
      try {
        title = info.message.split("\n")[0]
      } catch (_) {
        title = info.message.toString()
      }
      title = uncolor(title)
    } catch (err) {
      title = `Could not create a title for the error (${err.toString()})`
    }

    let body = info?.message || ""
    try {
      body = uncolor(body)
    } catch (_) {}

    const html = buildErrorEmailBody(info)

    try {
      const subject = `${config?.name} [${info.level.toUpperCase()}] ${title}`

      const mail = {
        from: this.from,
        to: this.to,
        subject: subject,
        text: body,
        html: html
      }

      emailer.queue_email(mail)
      this.emit("logged")
      callback(null, true)
    } catch (_) {
      // TODO - How to exxpose info from here
      this.emit("logged")
      callback(null, true)
    }
  }

  return MailerLogger
}

export { init_logger_to_mail }
