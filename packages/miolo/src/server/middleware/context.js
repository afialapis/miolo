
const init_context_middleware = ( app, miolo ) => {
  async function context_middleware(ctx, next) {

    // Assign miolo stuff to ctx
    ctx.miolo= miolo
    await next()

  }

  app.use(context_middleware)


}

export { init_context_middleware }