
// context builder
export const ssr_context_builder_make = (app, ssrConfig) => {

  const ssr_build_context = (ctx, config, ssr_data) => {
    const isAuthed = ctx?.session?.authenticated === true
    const user = ctx?.session?.user
    
    const context= {
      config,
      user,
      authenticated: isAuthed,
      ssr_data: ssr_data,
      extra: ctx?.extra
    }

    return context
  }
  
  return ssr_build_context
}