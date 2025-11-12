import Joi from "joi"

export function with_miolo_schema(fn, schema) {
  return async function (ctx, params) {
    let error
    
    // Check schema is actually a schema
    if ((!schema) || (! Joi.isSchema(schema))) {
      error = `Expecting schema for ${fn.name} but something else was found (${typeof schema})`
      ctx.miolo.logger.error(`[validation][${fn.name}] ${error}`)
      throw new Error(error)
    }
    
    // perform validation
    let v
    try {
      v = schema.validate(params)
    } catch(uerror) {
      error = `Unexpected error validating data for ${fn.name}: ${uerror?.message || uerror}`
      ctx.miolo.logger.error(`[validation][${fn.name}] ${error}`)
      throw new Error(error)
    }

    // raise validation errors
    if (v?.error) {
      error = `Schema invalidated data for ${fn.name}: ${v.error}\n${v.error.annotate(true)}`
      ctx.miolo.logger.error(`[validation][${fn.name}] ${error}`)
      throw new Error(error)
    }

    // check parsed value is ok
    if (!v?.value) {
      error = `Schema returned unknown result for ${fn.name}: ${JSON.stringify(v)}`
      ctx.miolo.logger.error(`[validation][${fn.name}] ${error}`)
      throw new Error(error)
    }
    
    return await fn(ctx, v.value)
  }
}
