import Joi from "joi"
import { ensure_response_is_ok_data, query_string_to_json } from "../utils.mjs"

function attachQueriesRoutes(router, queriesConfigs, logger) {
  queriesConfigs.forEach((queriesConfig) => {
    const prefix = queriesConfig.prefix

    queriesConfig.routes.forEach((route) => {
      let url = !prefix ? `/${route.url}` : `/${prefix}/${route.url}`
      while (url.indexOf("//") >= 0) {
        url = url.replace(/\/\//g, "/")
      }

      const routeAuth = route.auth
      const checkAuth =
        routeAuth.require === true || (routeAuth.require === "read-only" && route.method === "POST")

      logger.debug(
        `[router] Routing ${route.callback?.name || "callback"} to ${route.method} ${url}${checkAuth ? " (auth)" : ""}`
      )

      const _route_auth_callback = async (ctx) => {
        if (checkAuth) {
          const authenticated = ctx?.session?.authenticated === true
          if (!authenticated) {
            if (routeAuth.action === "error") {
              ctx.miolo.logger.error(`Unauthorized access. Throwing error ${routeAuth.error_code}`)
              ctx.throw(routeAuth.error_code, new Error("Unauthorized"), {})
            } else if (routeAuth.action === "redirect") {
              ctx.miolo.logger.warn(`Unauthorized access. Redirecting to ${routeAuth.redirect_url}`)
              ctx.redirect(routeAuth.redirect_url)
            } else {
              ctx.miolo.logger.error(`Route path ${route.url} specified auth but no action`)
            }
          }

          return authenticated
        }

        return true
      }

      const _route_callback = async (ctx) => {
        try {
          try {
            if (route.method === "GET" && !ctx.request?.body) {
              if (ctx.request.url.indexOf("?") > 0) {
                const fields = query_string_to_json(ctx.request.url)
                if (fields) {
                  ctx.request.body = fields
                }
              }
            }
          } catch (error) {
            ctx.miolo.logger.error(
              `[router] Error while trying to qet query params for ${ctx.request.url}: ${error?.message || "?"}`
            )
          }

          const authenticated = await _route_auth_callback(ctx)
          if (!authenticated) {
            ctx.body = {
              ok: false,
              error: "Not authorized"
            }
            return
          }

          let goon = true
          if (route?.before) {
            if (Array.isArray(route.before)) {
              for (const before of route.before) {
                goon = await before(ctx)
                if (!goon) {
                  break
                }
              }
            } else {
              goon = await route.before(ctx)
            }

            if (!goon) {
              ctx.body = {
                ok: false,
                error: `Route was aborted by a <before> callback (${route.before?.name})`
              }
              return
            }
          }

          const inputSchema = route?.schema?.input

          if (inputSchema) {
            // Check schema is actually a schema
            if (!Joi.isSchema(inputSchema)) {
              ctx.miolo.logger.error(
                `[router] Expecting input schema at ${url} but something else was found (${typeof inputSchema})`
              )
              ctx.body = {
                ok: false,
                error: "Invalid input schema"
              }
              return
            }

            try {
              const v = inputSchema.validate(ctx.request.body)

              if (v?.error) {
                ctx.miolo.logger.warn(
                  `[router] Input schema invalidated data for ${url}: ${v.error}\n${v.error.annotate(true)}`
                )
                ctx.body = {
                  ok: false,
                  error: v.error.toString()
                }
                return
              } else if (v?.value) {
                ctx.miolo.logger.silly(
                  `[router] Input schema validated data for ${url} successfully`
                )
                ctx.request.body = v.value
              } else {
                const description = inputSchema.describe()

                // Check if schema was deliberately set to allow only null
                //  schema = Joi.any().allow(null)
                const isOnlyNull =
                  description.type === "any" &&
                  description.allow &&
                  description.allow.length === 1 &&
                  description.allow[0] === null

                if (isOnlyNull) {
                  ctx.miolo.logger.silly(
                    `[router] Input schema allowed null param to ${url} successfully`
                  )
                  ctx.request.body = v.value
                } else {
                  ctx.miolo.logger.warn(
                    `[router] Input schema returned unknown result for ${url}: ${JSON.stringify(v)}. Let's ignore it.`
                  )
                }
              }
            } catch (error) {
              ctx.miolo.logger.error(
                `[router] Error validating input schema at ${url}: ${error?.message || error}`
              )
              ctx.body = {
                ok: false,
                error: error?.message || error
              }
              return
            }
          }

          const result = await route.callback(ctx, ctx.request.body)

          if (!route.keep_body) {
            if (ctx.body !== undefined) {
              ctx.body = ensure_response_is_ok_data(ctx, ctx.body)
            } else {
              ctx.body = ensure_response_is_ok_data(ctx, result)
            }
          }

          if (route?.after) {
            if (Array.isArray(route.after)) {
              for (const after of route.after) {
                const result = await after(ctx, ctx.body)
                ctx.body = ensure_response_is_ok_data(ctx, result)
              }
            } else {
              const result = await route.after(ctx, ctx.body)
              ctx.body = ensure_response_is_ok_data(ctx, result)
            }
          }

          // If body has no ok and read data, do not validate it
          if (ctx.body?.ok !== true || !ctx.body?.data) {
            return
          }

          const outputSchema = route?.schema?.output

          if (outputSchema) {
            // Check schema is actually a schema
            if (!Joi.isSchema(outputSchema)) {
              ctx.miolo.logger.error(
                `[router] Expecting output schema at ${url} but something else was found (${typeof outputSchema})`
              )
              ctx.body = {
                ok: false,
                error: "Invalid output schema"
              }
              return
            }

            // perform validation over the result
            let v
            try {
              v = outputSchema.validate(ctx.body.data, { stripUnknown: true })
            } catch (uerror) {
              const error = `Unexpected error validating output data for ${url}: ${uerror?.message || uerror}`
              ctx.miolo.logger.warn(`[router] ${error}`)
              ctx.body = {
                ok: false,
                error: error
              }
              return
            }

            // raise validation errors
            if (v?.error) {
              ctx.miolo.logger.warn(
                `[router] Output schema invalidated data for ${url}: ${v.error}\n${v.error.annotate(true)}`
              )
              ctx.body = {
                ok: false,
                error: v.error.toString()
              }
              return
            }

            if (v?.value) {
              const diff = diffObjs(ctx.body.data, v.value)
              if (diff) {
                ctx.miolo.logger.debug(`[router] Output schema has removed ${diff} for URL ${url}`)
              }

              ctx.miolo.logger.silly(
                `[router] Output schema validated data for ${url} successfully`
              )
              ctx.body.data = v.value
            }

            // check parsed value is ok
            if (!v?.value) {
              const description = outputSchema.describe()

              // Check if schema was deliberately set to allow only null
              //  schema = Joi.any().allow(null)
              const isOnlyNull =
                description.type === "any" &&
                description.allow &&
                description.allow.length === 1 &&
                description.allow[0] === null

              if (!isOnlyNull) {
                const error = `Output schema returned unknown result for ${fn.name}: ${JSON.stringify(v)}`
                ctx.miolo.logger.silly(`[router][${fn.name}] ${error}`)
                ctx.body = {
                  ok: false,
                  error: error
                }
                return
              }
            }
          }
        } catch (error) {
          ctx.miolo.logger.error(
            `[router] Unexpected error on Query ${route.callback?.name} at ${url}`
          )
          ctx.miolo.logger.error(error)
          ctx.body = {
            ok: false,
            error: error?.message || error
          }
        }
      }

      const router_method = route.method.toLowerCase()

      router[router_method](url, (ctx) => _route_callback(ctx, route))
    })
  })
}

export default attachQueriesRoutes
