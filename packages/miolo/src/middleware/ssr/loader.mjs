// ssr loader
export const ssr_loader_make = (app, ssrConfig) => {

  const ssr_loader = async (ctx) => {
    let res= {}
    try {
      if (ssrConfig?.loader) {
        res= await ssrConfig.loader(ctx)
      }
    } catch(e) {
      const tit= 'Error produced by loader in ssrConfig'
      const inf= `URL: ${ctx.request.url}\nFields: ${JSON.stringify(ctx.request?.fields || {})}`
      const det= e?.stack
        ? `${e.toString()}\n${e.stack}`
        : e.toString()
      const all= `${tit}\n${inf}\n${det}`
    
      ctx.miolo.logger.error(all)
    }
    return res  
  }

  return ssr_loader
}