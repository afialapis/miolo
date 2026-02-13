---
name: miolo-schemas
description: Joi validation schemas and patterns for miolo applications. Use when implementing request/parameter validation for routes or database functions, creating reusable schema components, or using with_miolo_schema wrapper.
---

# Miolo Validation Schemas

Joi validation schema patterns for miolo routes and database functions.

## Schema Wrapper: with_miolo_schema

Use `with_miolo_schema` to wrap route handlers and database functions with validation:

```javascript
import { with_miolo_schema } from 'miolo'
import Joi from 'joi'

// Define schema
const todoSchema = Joi.object({
  id: Joi.number().integer().optional(),
  description: Joi.string().required(),
  done: Joi.boolean().optional().default(false)
})

// Wrap function with schema
async function _r_todo_upsave(ctx, params) {
  // params are already validated here
  const { id, description, done } = params
  // ...
}

export const r_todo_upsave = with_miolo_schema(_r_todo_upsave, todoSchema)
```

**Key benefits:**
- Automatic validation before function execution
- Validation errors handled automatically
- Default values applied
- Type coercion

## Using Schemas in Routes

### Inline Schema (Route Definition)

Define schema directly in route configuration:

```javascript
import Joi from 'joi'

export default [{
  prefix: 'api',
  routes: [
    {
      method: 'GET',
      url: '/todo/last_hours',
      auth,
      callback: r_todo_count_last_hours,
      schema: Joi.object({
        hours: Joi.number().min(1).max(24).required()
      })
    }
  ]
}]
```

### Wrapper Schema (Function)

Wrap the handler function with schema:

```javascript
import { with_miolo_schema } from 'miolo'
import Joi from 'joi'

const todoSchema = Joi.object({
  done: Joi.bool().optional().default(false)
})

export default [{
  prefix: 'api',
  routes: [
    {
      method: 'POST',
      url: '/todo/fake',
      auth,
      callback: with_miolo_schema(r_todo_insert_fake, todoSchema)
    }
  ]
}]
```

## Using Schemas in Database Functions

**Strongly recommended** to validate database function parameters:

```javascript
import { with_miolo_schema } from 'miolo'
import Joi from 'joi'
import { opt_int, bool_null, opt_str_null } from '#server/lib/util/schema.mjs'

// Internal implementation
async function _db_todo_read(ctx, filter) {
  ctx.miolo.logger.verbose('[db_todo_read] Reading todos...')
  
  const conn = await ctx.miolo.db.get_connection()
  const options = { transaction: undefined }
  
  // ... query logic
  
  return todos
}

// Schema definition using partial schemas
const todo_read_schema = Joi.object({
  id: opt_int,
  todo_id: opt_int,
  description: opt_str_null,
  done: bool_null
})

// Export wrapped function
export const db_todo_read = with_miolo_schema(_db_todo_read, todo_read_schema)
```

**Pattern:**
1. Create private implementation function with `_` prefix
2. Define schema using partial schemas from `lib/util/schema.mjs`
3. Export wrapped function with `with_miolo_schema`

## Partial Schemas (Reusable Components)

Miolo provides common validation patterns in `src/server/lib/util/schema.mjs`:

```javascript
import Joi from 'joi'

// Integer (optional)
export const opt_int = Joi.number().integer().optional()

// String (optional, nullable)
export const opt_str_null = Joi.string().optional().allow(null)

// Boolean (nullable)
export const bool_null = Joi.boolean().optional().allow(null)

// Email
export const email = Joi.string().email().required()

// Positive integer
export const pos_int = Joi.number().integer().min(1).required()

// ... add more as needed
```

**Usage:**
```javascript
import { opt_int, opt_str_null, email } from '#server/lib/util/schema.mjs'

const userSchema = Joi.object({
  id: opt_int,
  email: email,
  name: opt_str_null,
  age: pos_int
})
```

## Common Schema Patterns

### Optional vs Required

```javascript
// Required field
description: Joi.string().required()

// Optional field
id: Joi.number().integer().optional()

// Optional with default
done: Joi.boolean().optional().default(false)
```

### Nullable Fields

```javascript
// Allow null
name: Joi.string().allow(null).optional()

// Using partial schema
name: opt_str_null
```

### Type Validation

```javascript
// Integer
id: Joi.number().integer()

// String with min/max length
description: Joi.string().min(3).max(500)

// Email
email: Joi.string().email()

// Boolean
active: Joi.boolean()

// Array
tags: Joi.array().items(Joi.string())

// Enum
status: Joi.string().valid('pending', 'active', 'completed')
```

### Number Constraints

```javascript
// Range
age: Joi.number().min(18).max(100)

// Positive
count: Joi.number().positive()

// Integer only
quantity: Joi.number().integer()
```

### String Constraints

```javascript
// Min/max length
name: Joi.string().min(3).max(50)

// Pattern (regex)
code: Joi.string().pattern(/^[A-Z]{3}[0-9]{3}$/)

// Case insensitive
email: Joi.string().email().lowercase()

// Trim whitespace
username: Joi.string().trim()
```

### Conditional Validation

```javascript
const schema = Joi.object({
  id: Joi.number().integer().optional(),
  description: Joi.when('id', {
    is: Joi.exist(),
    then: Joi.string().optional(),  // Optional when updating
    otherwise: Joi.string().required()  // Required when creating
  })
})
```

## Best Practices

1. **Always validate route parameters** - Use schema in route definition or with_miolo_schema
2. **Strongly recommended for db functions** - Wrap all db_*() functions with schemas
3. **Use partial schemas** - Reuse common patterns from `lib/util/schema.mjs`
4. **Add to partial schemas** - Extend `lib/util/schema.mjs` with new reusable patterns
5. **Private + public pattern** - Use `_function_name` for implementation, export wrapped version
6. **Default values** - Use `.default()` for optional fields with sensible defaults
7. **Allow null carefully** - Only use `.allow(null)` when null is a valid business value
8. **Validate early** - Validation should happen before any business logic

## Extending Partial Schemas

Add new reusable patterns to `src/server/lib/util/schema.mjs`:

```javascript
// Add new partial schemas
export const uuid = Joi.string().uuid().required()
export const opt_uuid = Joi.string().uuid().optional()
export const date_iso = Joi.date().iso().required()
export const opt_date_iso = Joi.date().iso().optional()
export const pagination = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
})
```

Then use across your application:

```javascript
import { uuid, date_iso, pagination } from '#server/lib/util/schema.mjs'

const eventSchema = Joi.object({
  id: uuid,
  created_at: date_iso,
  ...pagination
})
```

## Examples from miolo-sample

See actual implementations:
- `src/server/lib/util/schema.mjs` - Partial schema definitions
- `src/server/db/io/todos/read.mjs` - Database function with schema
- `src/server/db/io/todos/upsave.mjs` - Insert/update with schema
- `src/server/routes/index.mjs` - Route schemas (inline and wrapper)
