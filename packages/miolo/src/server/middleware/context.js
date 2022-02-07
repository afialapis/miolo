
const init_context_middleware = ( app, config, logger, emailer, conn  ) => {
  async function context_middleware(ctx, next) {

    // Assign miolo stuff to ctx
    ctx.miolo= {
      config,
      logger,
      emailer,
      conn
    }

    await next()

  }

  app.use(context_middleware)


}

export { init_context_middleware }