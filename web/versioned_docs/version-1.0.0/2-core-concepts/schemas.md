---
sidebar_position: 5
---

# Esquemas de Validación (Schemas)

Garantizar que los datos de entrada a tus rutas y los datos de salida de tus consultas de base de datos son correctos es fundamental. Miolo hace un uso exhaustivo de **Joi** para este propósito, a través de dos *wrappers* principales: `with_miolo_input_schema` y `with_miolo_output_schema`.

## Validación en Rutas (Inputs)

La manera más limpia de validar los parámetros HTTP (body, query o url params) que llegan a un endpoint es declarar los esquemas directamente en el bloque de rutas (`routes/index.mjs`).

```javascript
import Joi from 'joi'

export default [{
  prefix: 'api',
  routes: [
    {
      method: 'GET',
      url: '/item/search',
      callback: r_item_search,
      schema: {
        // Valida la entrada antes de ejecutar el callback
        input: Joi.object({
          query: Joi.string().min(3).required(),
          limit: Joi.number().min(1).max(100).default(20)
        }),
        // Valida la salida y recorta campos extra
        output: Joi.object({
          ok: Joi.boolean().required(),
          data: Joi.array().items(Joi.object()).required()
        })
      }
    }
  ]
}]
```

Con esta configuración, si el usuario hace `GET /item/search?query=ab`, Miolo automáticamente rechazará la petición con un error HTTP `400 Bad Request` indicando que la longitud mínima es 3, **sin llegar a ejecutar** `r_item_search`. Además, si no envía `limit`, Miolo lo inyectará con el valor `20` en `params`.

## Validación en Base de Datos (Inputs y Outputs)

Se recomienda encarecidamente proteger las funciones de la carpeta `io/db/` mediante esquemas, ya que son la última línea de defensa antes de atacar la base de datos.

El patrón recomendado para esto es:
1. Crear la función "privada" con un guión bajo (`_db_funcion`).
2. Exportar la función pública envuelta por `with_miolo_input_schema`.

```javascript
import { with_miolo_input_schema } from 'miolo'
import Joi from 'joi'
import { opt_int, opt_str_null, bool_null } from '#server/utils/schema.mjs'

// 1. Implementación privada
async function _db_todo_read(ctx, filter) {
  // Aquí tienes la garantía de que "filter" ha pasado la validación
  // ...
}

// 2. Esquema
const todo_read_schema = Joi.object({
  todo_id: opt_int,
  description: opt_str_null,
  done: bool_null
})

// 3. Exportación protegida
export const db_todo_read = with_miolo_input_schema(_db_todo_read, todo_read_schema)
```

### Limpieza con Outputs Schemas

Es muy útil usar `with_miolo_output_schema` en operaciones de base de datos para garantizar que no se "cuelan" campos sensibles (como contraseñas) o irrelevantes hacia el cliente, ya que Joi recorta automáticamente todas las propiedades que no estén explícitamente declaradas en el esquema (por defecto, `stripUnknown`).

```javascript
import { with_miolo_output_schema } from 'miolo'

const safeUserOutput = Joi.object({
  id: Joi.number().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required()
  // "password" y "secret_token" serán eliminados si la función los devuelve.
})

export const db_user_find = with_miolo_output_schema(_db_user_find, safeUserOutput)
```

## Esquemas Parciales Reutilizables

Para no repetir constantemente el mismo código de validación Joi, Miolo proporciona y recomienda mantener un archivo de "piezas" de esquemas en `src/server/utils/schema.mjs`.

```javascript
// src/server/utils/schema.mjs
import Joi from 'joi'

export const opt_int = Joi.number().integer().optional()
export const opt_str_null = Joi.string().optional().allow(null)
export const email = Joi.string().email().required()
export const uuid = Joi.string().uuid().required()
```

De esta forma construir validadores es rápido y consistente:

```javascript
import { opt_int, email } from '#server/utils/schema.mjs'

const updateSchema = Joi.object({
  id: opt_int,
  user_email: email
})
```
