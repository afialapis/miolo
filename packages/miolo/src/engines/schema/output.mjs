import Joi from "joi"
import { diffObjs } from "./diffObjs.mjs"

export function with_miolo_output_schema(fn, schema) {
  const fnName = fn?.name ? `[${fn.name}]` : ""

  return async (ctx, params) => {
    let error

    // Check schema is actually a schema
    if (!schema || !Joi.isSchema(schema)) {
      error = `Expecting output schema for ${fn.name} but something else was found (${typeof schema})`
      ctx.miolo.logger.silly(`[validation]${fnName} ${error}`)
      throw new Error(error)
    }

    // Call the function first
    const result = await fn(ctx, params)

    // perform validation over the result
    let v
    try {
      v = schema.validate(result, { stripUnknown: true })
    } catch (uerror) {
      error = `Unexpected error validating output data for ${fn.name}: ${uerror?.message || uerror}`
      ctx.miolo.logger.silly(`[validation]${fnName} ${error}`)
      throw new Error(error)
    }

    // raise validation errors
    if (v?.error) {
      error = `Output schema invalidated data for ${fn.name}: ${v.error}\n${v.error.annotate(true)}`
      ctx.miolo.logger.silly(`[validation]${fnName} ${error}`)
      throw new Error(error)
    }

    // check parsed value is ok
    if (!v?.value) {
      const description = schema.describe()

      // Check if schema was deliberately set to allow only null
      //  schema = Joi.any().allow(null)
      const isOnlyNull =
        description.type === "any" &&
        description.allow &&
        description.allow.length === 1 &&
        description.allow[0] === null

      if (!isOnlyNull) {
        error = `Output schema returned unknown result for ${fn.name}: ${JSON.stringify(v)}`
        ctx.miolo.logger.silly(`[validation]${fnName} ${error}`)
        throw new Error(error)
      }
    }

    const diff = diffObjs(result, v.value)
    if (diff) {
      ctx.miolo.logger.debug(`[validation]${fnName} Output schema has removed ${diff}`)
    }

    return v.value
  }
}
