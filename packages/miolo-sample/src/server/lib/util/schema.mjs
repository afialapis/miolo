import Joi from 'joi'

export const req_int = Joi.number().integer().required()

export const opt_float = Joi.number().optional().empty(null)
export const opt_float_null = Joi.number().optional().allow(null)

export const opt_int = Joi.number().integer().optional().empty(null)
export const opt_int_null = Joi.number().integer().optional().allow(null)

export const opt_int_or_arr = Joi.alternatives().try(
  Joi.number().integer(), 
  Joi.array().items(Joi.number().integer())
).optional().empty(null)

export const req_str = Joi.string().required()
export const opt_str = Joi.string().optional().empty(null)
export const opt_str_null = Joi.string().optional().allow(null)

export const bool_false = Joi.boolean().optional().default(false)
export const bool_true = Joi.boolean().optional().default(true)
export const bool_null = Joi.boolean().optional().allow(null)



