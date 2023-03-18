
const init_extra_middlewares = ( app, middlewares  ) => {
  if (middlewares==undefined || middlewares.length==0) {
    return
  }

  middlewares.map(midw => {

    async function extra_middleware(ctx, next) {
      await midw(ctx) 
      await next()
    }
  
    app.use(extra_middleware)
  })
}

export { init_extra_middlewares }