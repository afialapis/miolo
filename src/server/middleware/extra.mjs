
const init_extra_middlewares = ( app, middlewares  ) => {
  if (middlewares==undefined || middlewares.length==0) {
    return
  }

  middlewares.map(midw => { 
    app.use(midw)
  })
}

export { init_extra_middlewares }