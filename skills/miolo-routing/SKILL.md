---
name: miolo-routing
description: API routing patterns for miolo applications. Use when creating or modifying API endpoints, registering routes, handling HTTP requests, or structuring server-side route handlers in miolo apps. For validation schemas, see miolo-schemas skill.
---

# Miolo Routing Patterns

Standard patterns for creating API routes in miolo applications following miolo-sample conventions.

## Route Organization

Routes are organized in `src/server/routes/` by domain/feature:

```
src/server/routes/
├── index.mjs          # Route registration array
├── users/             # User-related endpoints
│   └── user.mjs
├── todos/             # Todo endpoints  
│   ├── mod.mjs        # CRUD operations
│   ├── read.mjs       # Read queries
│   └── special.mjs    # Special operations
└── [feature]/         # Additional feature routes
```

## Route Registration Pattern

All routes are registered in `src/server/routes/index.mjs` using miolo's route array format:

```javascript
import { r_item_list, r_item_find } from './items/read.mjs'
import { r_item_upsave, r_item_delete } from './items/mod.mjs'

const auth = {
  require: true,
  action: 'redirect',
  redirect_url: '/page/login'
}

export default [{
  prefix: 'api',
  routes: [
    { method: 'GET',  url: '/item/list',   auth, callback: r_item_list },
    { method: 'GET',  url: '/item/find',   auth, callback: r_item_find },
    { method: 'POST', url: '/item/save',   auth, callback: r_item_upsave },
    { method: 'POST', url: '/item/delete', auth, callback: r_item_delete },
  ]
}]
```

**Key elements:**
- Export default array of route groups
- Each group has `prefix` and `routes` array
- Each route has `method`, `url`, optional `auth`, and `callback`
- Import route handler functions from feature files

## Creating Route Handlers

### Basic Handler Structure

Route handlers receive `(ctx, params)` and return `{ ok, data }` or `{ ok, error }`:

```javascript
import { db_item_read } from '#server/db/io/items/read.mjs'

export async function r_item_list(ctx, params) {
  try {
    ctx.miolo.logger.info('[r_item_list] Fetching items')
    
    const items = await db_item_read(ctx, params)
    
    ctx.miolo.logger.info('[r_item_list] Found items')
    return { ok: true, data: items }
    
  } catch (error) {
    ctx.miolo.logger.error(`[r_item_list] Error: ${error}`)
    return { ok: false, error: error?.message }
  }
}
```

**Handler conventions:**
- Function names start with `r_` (route)
- Take `(ctx, params)` as arguments
- Return object with `ok` boolean
- Include `data` on success, `error` on failure
- Use `ctx.miolo.logger` for logging (`info` level)
- Wrap in try/catch

### Accessing Request Data

```javascript
export async function r_item_find(ctx, params) {
  // params contains:
  // - URL query parameters (?foo=bar)
  // - POST body data
  // - Already validated if schema provided
  
  const { id } = params
  
  // Access user from context
  const user = ctx.state.user
  
  // Access logger
  ctx.miolo.logger.info(`User ${user.id} requesting item ${id}`)
  
  return { ok: true, data: item }
}
```

### CRUD Operations Example

Complete CRUD implementation:

```javascript
// items/mod.mjs
import { db_item_upsave } from '#server/db/io/items/upsave.mjs'
import { db_item_delete } from '#server/db/io/items/delete.mjs'

export async function r_item_upsave(ctx, params) {
  try {
    ctx.miolo.logger.info(`[r_item_upsave] Saving item ${params?.id || 'new'}`)
    
    const item = await db_item_upsave(ctx, params)
    
    ctx.miolo.logger.info(`[r_item_upsave] Saved item ${item.id}`)
    return { ok: true, data: item }
    
  } catch (error) {
    ctx.miolo.logger.error(`[r_item_upsave] Error: ${error}`)
    return { ok: false, error: error?.message }
  }
}

export async function r_item_delete(ctx, params) {
  try {
    ctx.miolo.logger.info(`[r_item_delete] Deleting item ${params.id}`)
    
    await db_item_delete(ctx, params)
    
    ctx.miolo.logger.info(`[r_item_delete] Deleted item ${params.id}`)
    return { ok: true, data: { deleted: true } }
    
  } catch (error) {
    ctx.miolo.logger.error(`[r_item_delete] Error: ${error}`)
    return { ok: false, error: error?.message }
  }
}
```

### Request Validation with Joi

Add schema validation inline or as wrapper:

**Inline schema:**
```javascript
import Joi from 'joi'

export default [{
  prefix: 'api',
  routes: [
    {
      method: 'GET',
      url: '/item/search',
      auth,
      callback: r_item_search,
      schema: Joi.object({
        query: Joi.string().min(3).required(),
        limit: Joi.number().min(1).max(100).default(20)
      })
    }
  ]
}]
```

**Wrapper function:**
```javascript
import { with_miolo_schema } from 'miolo'
import Joi from 'joi'

const itemSchema = Joi.object({
  description: Joi.string().required(),
  done: Joi.bool().optional().default(false)
})

export default [{
  prefix: 'api',
  routes: [
    {
      method: 'POST',
      url: '/item/save',
      auth,
      callback: with_miolo_schema(r_item_upsave, itemSchema)
    }
  ]
}]
```

## Authentication

Configure authentication per route:

```javascript
// Require authentication
const auth = {
  require: true,
  action: 'redirect',
  redirect_url: '/page/login'
}

// Public route (no auth)
{ method: 'GET', url: '/public/data', callback: r_public_data }

// Protected route (with auth)
{ method: 'GET', url: '/private/data', auth, callback: r_private_data }
```

Authenticated routes automatically have `ctx.state.user` populated.

## Multi-file Organization

For complex features, split into multiple files:

```
routes/todos/
├── mod.mjs        # CRUD operations (upsave, delete, toggle)
├── read.mjs       # Read operations (list, find)
└── special.mjs    # Special operations (count, batch, etc.)
```

Each file exports handler functions, all registered in `routes/index.mjs`.

## Common Patterns

### Logging Pattern

```javascript
export async function r_item_operation(ctx, params) {
  try {
    ctx.miolo.logger.info(`[r_item_operation] Starting with id ${params.id}`)
    
    const result = await db_item_operation(ctx, params)
    
    ctx.miolo.logger.info(`[r_item_operation] Success for id ${params.id}`)
    return { ok: true, data: result }
    
  } catch (error) {
    ctx.miolo.logger.error(`[r_item_operation] Error for id ${params.id}: ${error}`)
    return { ok: false, error: error?.message }
  }
}
```

### Error Handling

```javascript
export async function r_item_find(ctx, params) {
  try {
    const item = await db_item_find(ctx, params)
    
    if (!item) {
      return { ok: false, error: 'Item not found' }
    }
    
    return { ok: true, data: item }
    
  } catch (error) {
    ctx.miolo.logger.error(`[r_item_find] Error: ${error}`)
    return { ok: false, error: error?.message }
  }
}
```

## Adding a New Feature

1. **Create database functions** in `src/server/db/io/feature/`:
   ```javascript
   // db/io/items/read.mjs
   export async function db_item_read(ctx, params) { /* ... */ }
   ```

2. **Create route handlers** in `src/server/routes/feature/`:
   ```javascript
   // routes/items/mod.mjs
   export async function r_item_list(ctx, params) { /* ... */ }
   export async function r_item_upsave(ctx, params) { /* ... */ }
   ```

3. **Register routes** in `routes/index.mjs`:
   ```javascript
   import { r_item_list, r_item_upsave } from './items/mod.mjs'
   
   export default [{
     prefix: 'api',
     routes: [
       { method: 'GET',  url: '/item/list', auth, callback: r_item_list },
       { method: 'POST', url: '/item/save', auth, callback: r_item_upsave },
     ]
   }]
   ```

## Best Practices

1. **Use database abstraction** - Never write SQL in routes, use `db/io/` functions
2. **Consistent naming** - Routes start with `r_`, database functions with `db_`
3. **Always log** - Use `ctx.miolo.logger` for all operations (`info`level)
4. **Return consistent format** - Always `{ ok, data }` or `{ ok, error }`
5. **Validate inputs** - Use Joi schemas for validation
6. **Handle errors** - Wrap in try/catch, return meaningful errors
7. **Check user access** - Use `ctx.state.user` to verify permissions
8. **Keep handlers thin** - Business logic in `db/io/`, routes only handle HTTP

## Examples from miolo-sample

See actual implementations:
- `src/server/routes/index.mjs` - Route registration
- `src/server/routes/todos/mod.mjs` - CRUD handlers
- `src/server/routes/todos/read.mjs` - Read operations
- `src/server/routes/todos/special.mjs` - Custom operations
