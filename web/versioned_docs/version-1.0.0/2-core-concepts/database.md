---
sidebar_position: 2
---

# Base de Datos (Database)

En la arquitectura Miolo, todas las operaciones y consultas a bases de datos PostgreSQL se organizan estrictamente en la capa de Entrada/Salida: `src/server/io/db/`. 

## Patrones y Convenciones

Para mantener la base de código escalable y fácil de seguir, se debe utilizar la siguiente estructura:

- **Nomenclatura**: Todas las funciones que tocan la base de datos deben comenzar por `db_` (ej: `db_user_auth`, `db_todo_upsave`).
- **Agrupación**: Agrupa por dominio o tabla (ej: `io/db/todos/`).
- **Firma Única**: Las funciones siempre reciben `(ctx, params)` como argumentos, siendo el mismo `params` que llega a las rutas desde el cliente.

## Ejecución de Consultas (CRUD)

Para acceder a la base de datos se utiliza el objeto de conexión provisto por Miolo. A continuación, ejemplos de los patrones de operaciones estándar:

### 1. Lectura de listas (Read)

```javascript
export async function db_todo_read(ctx, params) {
  ctx.miolo.logger.verbose('[db_todo_read] Leyendo todos...')
  
  const { user_id, status } = params
  
  // 1. Obtener conexión
  const conn = await ctx.miolo.db.get_connection()
  const options = { transaction: undefined }
  
  // 2. Construir query
  let query = 'SELECT * FROM todos WHERE user_id = $1'
  const values = [user_id]
  
  // (La construcción dinámica suele delegarse a make_query_filter)
  query += ' ORDER BY created_at DESC'
  
  // 3. Ejecutar
  const todos = await conn.select(query, values, options)
  return todos
}
```

### 2. Creación y Actualización (Upsave)

El patrón "Upsave" determina automáticamente si debe insertar un nuevo registro o actualizar uno existente dependiendo de si recibe el `id`.

```javascript
export async function db_todo_upsave(ctx, params) {
  const { id, description, user_id, done = false } = params
  
  const conn = await ctx.miolo.db.get_connection()
  const options = { transaction: undefined }
  
  // Utilizamos la abstracción get_model
  const Todo = await conn.get_model('todo')
  
  if (id) {
    // Actualización
    await Todo.update(
      { description, done }, // Campos a actualizar
      { id, user_id },       // WHERE (id = id AND user_id = user_id)
      options
    )
    return { ...params, id }
  } else {
    // Inserción
    const newId = await Todo.insert(
      { description, done, user_id },
      options
    )
    return { ...params, id: newId }
  }
}
```

### 3. Borrado (Delete)

```javascript
export async function db_todo_delete(ctx, params) {
  const { id } = params
  const conn = await ctx.miolo.db.get_connection()
  
  const Todo = await conn.get_model('todo')
  
  // El segundo argumento es la condición WHERE
  await Todo.delete({ id }, { transaction: undefined })
  
  return id
}
```

## Filtros Avanzados (`make_query_filter`)

Para listados donde el usuario puede pasar decenas de filtros diferentes (búsquedas, estados, rangos de fechas), Miolo proporciona la utilidad `make_query_filter`. Esto elimina la necesidad de escribir enormes cascadas de `if/else` concatenando strings SQL.

```javascript
import { make_query_filter } from '#server/io/db/filter.mjs'

export async function db_todo_search(ctx, filter) {
  const conn = await ctx.miolo.db.get_connection()

  let query = `SELECT * FROM todo AS t *WHERE*`

  // Construye dinámicamente el WHERE y los array paramétricos ($1, $2)
  const [where, values] = make_query_filter(filter, {
    todo_id: { alias: 't.id' },
    description: { op: '~*' },  // Búsqueda regex insensible a mayúsculas
    done: { coalesce: false, alias: 'COALESCE(done, false)' }
  }, {
    fields: ['todo_id', 'description', 'done'] // Campos permitidos
  })

  // Protección: Exigir siempre al menos 1 filtro
  if (values.length === 0) {
    throw new Error('Debe especificar al menos un filtro de búsqueda.')
  }

  query = query.replace('*WHERE*', where)
  return await conn.select(query, values, { transaction: undefined })
}
```

## Configuración y Setup Inicial

La base de datos se configura en `src/server/miolo/db.mjs`. Miolo leerá las variables de entorno (`.env`) como `POSTGRES_DB`, `POSTGRES_HOST`, `POSTGRES_USER` para instanciar el *connection pool*.

El *scaffolding* de Miolo también te genera la carpeta `db/sql/`, donde debes ubicar tus archivos de migraciones/creaciones SQL (`01_users.sql`, `02_items.sql`) que se ejecutarán secuencialmente al inicializar tu base de datos mediante el script `db/init.sh`.

## Resumen de Mejores Prácticas

- Parametriza absolutamente todo con `$1`, `$2` para evitar Inyección SQL.
- Utiliza la abstracción `conn.get_model('name')` para evitar escribir manuales de `INSERT`/`UPDATE`.
- Añade SIEMPRE `LIMIT` a tus queries de lectura para no colapsar la respuesta.
- Nunca te olvides de comprobar los accesos integrando `user_id` en las condiciones `WHERE`.
