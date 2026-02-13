---
name: miolo-database
description: Database query patterns and organization for miolo applications. Use when creating database queries, organizing db/io structure, writing SQL, or implementing data access layers in miolo apps. For validation schemas, see miolo-schemas skill.
---

# Miolo Database Patterns

Database query organization and patterns for miolo applications using PostgreSQL.

## Database Layer Organization

All database queries are in `src/server/db/io/`, organized by domain:

```
src/server/db/io/
├── filter.mjs         # Common query filters
├── users/             # User-related queries
│   ├── auth.mjs
│   ├── pwd.mjs
│   └── save.mjs
├── todos/             # Todo queries
│   ├── read.mjs
│   ├── upsave.mjs
│   ├── delete.mjs
│   └── toggle.mjs
└── [feature]/         # Feature-specific queries
```

## Database Query Pattern

All database functions follow consistent naming and structure:

```javascript
// src/server/db/io/items/read.mjs

export async function db_item_read(ctx, params) {
  ctx.miolo.logger.verbose('[db_item_read] Reading items...')
  
  const { user_id } = params
  
  const conn = await ctx.miolo.db.get_connection()
  const options = { transaction: undefined }
  
  const query = `
    SELECT id, description, created_at
    FROM items
    WHERE user_id = $1
    ORDER BY created_at DESC
  `
  
  const items = await conn.select(query, [user_id], options)
  
  ctx.miolo.logger.verbose(`[db_item_read] Read ${items.length} items`)
  return items
}
```

**Naming conventions:**
- Functions start with `db_`
- Format: `db_[domain]_[action]`
- Examples: `db_user_auth`, `db_todo_upsave`, `db_item_delete`

**Function signature:**
- Takes `(ctx, params)` as arguments
- `ctx` contains `ctx.miolo.db` for database access
- `params` contains all query parameters

## CRUD Operations

### Read (List)

```javascript
export async function db_todo_read(ctx, params) {
  ctx.miolo.logger.verbose('[db_todo_read] Reading todos...')
  
  const { user_id, status } = params
  
  const conn = await ctx.miolo.db.get_connection()
  const options = { transaction: undefined }
  
  let query = 'SELECT * FROM todos WHERE user_id = $1'
  const values = [user_id]
  
  if (status) {
    query += ' AND status = $2'
    values.push(status)
  }
  
  query += ' ORDER BY created_at DESC'
  
  const todos = await conn.select(query, values, options)
  
  ctx.miolo.logger.verbose(`[db_todo_read] Read ${todos.length} todos`)
  return todos
}
```

### Read (Single)

```javascript
export async function db_todo_find(ctx, params) {
  ctx.miolo.logger.verbose(`[db_todo_find] Finding todo ${params.id}...`)
  
  const { id, user_id } = params
  
  const conn = await ctx.miolo.db.get_connection()
  const options = { transaction: undefined }
  
  const query = `
    SELECT * FROM todos
    WHERE id = $1 AND user_id = $2
  `
  
  const todos = await conn.select(query, [id, user_id], options)
  
  ctx.miolo.logger.verbose(`[db_todo_find] Todo ${id} ${todos[0] ? 'found' : 'not found'}`)
  return todos[0] || null
}
```

### Insert/Update (Upsave)

```javascript
export async function db_todo_upsave(ctx, params) {
  const { id, description, user_id, done = false } = params
  
  ctx.miolo.logger.verbose(`[db_todo_upsave] ${id ? 'Updating' : 'Inserting'} todo...`)
  
  const conn = await ctx.miolo.db.get_connection()
  const options = { transaction: undefined }
  
  const Todo = await conn.get_model('todo')
  
  if (id) {
    // Update existing
    const nrecs = await Todo.update(
      { description, done },
      { id, user_id },
      options
    )
    
    ctx.miolo.logger.verbose(`[db_todo_upsave] Updated ${nrecs} todos`)
    return { ...params, id }
  } else {
    // Insert new
    const newId = await Todo.insert(
      { description, done, user_id },
      options
    )
    
    ctx.miolo.logger.verbose(`[db_todo_upsave] Inserted todo with id ${newId}`)
    return { ...params, id: newId }
  }
}
```

### Delete

```javascript
export async function db_todo_delete(ctx, params) {
  ctx.miolo.logger.verbose(`[db_todo_delete] Deleting todo ${params.id}...`)
  
  const { id } = params
  
  const conn = await ctx.miolo.db.get_connection()
  const options = { transaction: undefined }
  
  const Todo = await conn.get_model('todo')
  
  await Todo.delete({ id }, options)
  
  ctx.miolo.logger.verbose(`[db_todo_delete] Deleted todo ${id}`)
  return id
}
```

## Query Execution

Always get a connection first, then use the connection methods:

```javascript
const conn = await ctx.miolo.db.get_connection()
const options = { transaction: undefined }

// SELECT query
const users = await conn.select('SELECT * FROM users WHERE id = $1', [userId], options)

// Single row
const user = users[0]

// Check if found
if (users.length === 0) {
  return null
}
```

## Query Filters with make_query_filter

All SELECT queries should use `make_query_filter()` from `db/io/filter.mjs` to build WHERE clauses:

**File:** `src/server/db/io/filter.mjs`

```javascript
import { make_query_filter } from '#server/db/io/filter.mjs'

export async function db_todo_read(ctx, filter) {
  ctx.miolo.logger.verbose('[db_todo_read] Reading todos...')
  ctx.miolo.logger.silly(`[db_todo_read] filter: ${JSON.stringify(filter)}`)

  const conn = await ctx.miolo.db.get_connection()
  const options = { transaction: undefined }

  let query = `
    SELECT *
      FROM todo AS t
      *WHERE*`

  const [where, values] = make_query_filter(filter, {
    todo_id: { alias: 't.id' },
    description: { op: '~*' },  // Case-insensitive regex match
    done: { coalesce: false, alias: 'COALESCE(done, false)' }
  }, {
    fields: ['id', 'todo_id', 'description', 'done']
  })

  // IMPORTANT: Always check that at least one filter is provided
  if (values.length === 0) {
    throw new Error('[db_todo_read] At least one filter must be specified')
  }

  query = query.replace('*WHERE*', where)

  const todos = await conn.select(query, values, options)

  ctx.miolo.logger.verbose(`[db_todo_read] Read ${todos.length} todos`)
  return todos
}
```

**make_query_filter parameters:**

1. **filter** - Object with filter values from request
2. **field_config** - Configuration for each filterable field:
   - `alias` - SQL column alias (e.g., `'t.id'`)
   - `op` - Operator (e.g., `'~*'` for case-insensitive match, `'='` default)
   - `coalesce` - Default value for NULL fields
3. **options** - Configuration:
   - `fields` - Array of allowed filter field names

**Returns:** `[whereClause, values]`
- `whereClause` - SQL WHERE clause string
- `values` - Array of parameterized values

**Usage pattern:**
```javascript
const [where, values] = make_query_filter(params, {
  user_id: { alias: 'u.id' },
  email: { op: 'ILIKE' },
  status: { alias: 'status' }
}, {
  fields: ['user_id', 'email', 'status']
})

// Always validate that at least one filter is provided
if (values.length === 0) {
  throw new Error('At least one filter must be specified')
}

let query = `SELECT * FROM users AS u *WHERE*`
query = query.replace('*WHERE*', where)
const users = await conn.select(query, values, options)
```


## Database Configuration

Database connection configured in `src/server/miolo/db.mjs`:

```javascript
export default {
  db: {
    database: process.env.POSTGRES_DB,
    host: process.env.IS_DOCKER === "true" ? process.env.MIOLO_DB_DOCKER_HOST  : process.env.MIOLO_DB_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    max:      process.env.MIOLO_DB_POOL_MAX,
    min:      process.env.MIOLO_DB_POOL_MIN,
    idleTimeoutMillis: process.env.MIOLO_DB_POOL_IDLE_TIMEOUT_MS,     
  },
  options: {
    // check https://github.com/afialapis/calustra?tab=readme-ov-file#options
    tables: {
      name: 'todo',
      useDateFields: true,
      useUserFields: {
        use: true,
        fieldNames: {
          created_by: 'created_by', 
          last_update_by: 'last_update_by'
        }        
      },
      triggers: {
        beforeInsert: (conn, params, options) => {
          return [params, options, true]
        }
      }
    }
  }
}
```

Environment variables in `.env`:
```
POSTGRES_DB=myapp_dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
```

## Database Initialization

SQL migrations in `db/sql/` executed in alphabetical order:

```
db/sql/
├── 00_drop.sql       # Drop tables (development)
├── 01_users.sql      # Create users table
├── 02_items.sql      # Create items table
└── 03_indexes.sql    # Create indexes
```

Run initialization:
```bash
./db/init.sh myapp_db
```

## Best Practices

1. **Always parameterize** - Never concatenate user input into SQL
2. **Require filters** - Always check `values.length > 0` after `make_query_filter()` and throw error if no filters
3. **Check ownership** - Include `user_id` in WHERE clauses to enforce access control
4. **Return RETURNING** - Use `RETURNING *` for INSERT/UPDATE to get created data
5. **Handle not found** - Return `null` for single records, `[]` for lists
6. **Use transactions** - For multi-query operations that must succeed/fail together
7. **Index properly** - Add indexes on frequently queried columns
8. **Limit results** - Always use LIMIT for list queries to prevent large responses
9. **Keep queries in db/io/** - Never write SQL in route handlers
10. **Always log** - Use `ctx.miolo.logger` for all operations (`verbose` level)

## Examples from miolo-sample

See actual implementations:
- `src/server/db/io/todos/read.mjs` - Read queries
- `src/server/db/io/todos/upsave.mjs` - Insert/update pattern
- `src/server/db/io/users/auth.mjs` - Authentication query
- `src/server/miolo/db.mjs` - Database configuration
