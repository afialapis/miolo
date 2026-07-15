---
sidebar_position: 1
---

# Enrutamiento Backend (Routing)

El enrutamiento en Miolo sigue un patrón estricto diseñado para mantener los controladores (handlers) limpios, las rutas organizadas por dominio, y asegurar que la validación y la autorización se manejan antes de que la lógica de negocio se ejecute.

Todas las rutas se organizan dentro del directorio `src/server/routes/`.

## Registro Centralizado

Todas las rutas de la aplicación se declaran en un único punto de entrada: `src/server/routes/index.mjs`. Miolo utiliza un formato de array de configuración que agrupa rutas bajo diferentes prefijos y configuraciones de autorización.

```javascript
import { r_item_list, r_item_find } from './items/read.mjs'
import { r_item_upsave, r_item_delete } from './items/mod.mjs'

// Configuración opcional de autorización compartida
const auth = {
  require: true,
  action: 'redirect',
  redirect_url: '/page/login'
}

export default [{
  prefix: 'api', // Prefijo para este grupo de rutas (e.g. /api/item/list)
  routes: [
    { method: 'GET',  url: '/item/list',   auth, callback: r_item_list },
    { method: 'GET',  url: '/item/find',   auth, callback: r_item_find },
    { method: 'POST', url: '/item/save',   auth, callback: r_item_upsave },
    { method: 'POST', url: '/item/delete', auth, callback: r_item_delete },
  ]
}]
```

## Handlers (Controladores)

Los archivos que manejan las rutas se agrupan por dominio dentro de subcarpetas (ej: `routes/items/read.mjs`).

### Convenciones

1. **Nomenclatura**: Todas las funciones exportadas para servir como endpoints deben comenzar con `r_` (ej. `r_item_list`).
2. **Firmas**: Todas las funciones reciben dos parámetros: `(ctx, params)`.
   - `ctx`: El contexto de Koa enriquecido por Miolo (`ctx.miolo`, `ctx.state.user`, etc.).
   - `params`: Parámetros de URL, de la query string, o del body unificados en un único objeto.
3. **Respuesta Estándar**: Siempre deben devolver un objeto con la propiedad `ok: boolean`. Si todo va bien, devuelven `{ ok: true, data }`. Si hay un error, `{ ok: false, error: 'Mensaje' }`.

### Ejemplo Práctico

```javascript
import { db_item_read } from '#server/io/db/items/read.mjs'

export async function r_item_list(ctx, params) {
  try {
    ctx.miolo.logger.info('[r_item_list] Obteniendo items...')
    
    // Delegamos la lógica de DB a la capa correspondiente
    const items = await db_item_read(ctx, params)
    
    ctx.miolo.logger.info('[r_item_list] Items obtenidos')
    return { ok: true, data: items }
    
  } catch (error) {
    ctx.miolo.logger.error(`[r_item_list] Error: ${error}`)
    return { ok: false, error: error?.message }
  }
}
```

## Autorización e Identidad

Las rutas protegidas con el objeto `auth` (ver ejemplo superior) garantizan que el middleware de sesión de Miolo valide el acceso antes de ejecutar el callback. 

Si el usuario pasa la validación, podrás acceder a sus datos directamente desde `ctx.state.user`:

```javascript
export async function r_private_data(ctx, params) {
  const userId = ctx.state.user.id;
  // Lógica protegida
}
```

## Validación de Entradas (Schemas)

Es una buena práctica validar `params` utilizando esquemas (habitualmente con `joi`). Puedes envolver tu controlador utilizando `with_miolo_input_schema`:

```javascript
import { with_miolo_input_schema } from 'miolo'
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
      callback: with_miolo_input_schema(r_item_upsave, itemSchema) // Valida automáticamente
    }
  ]
}]
```

## Resumen de Mejores Prácticas

- Mantén los controladores delgados. Su única misión es procesar la request HTTP y delegar la lógica empresarial y de base de datos a `src/server/io/db/` o `src/server/trigger/`.
- Nunca escribas SQL puro dentro del directorio `routes/`.
- Envuelve siempre la lógica en un `try/catch` para evitar peticiones HTTP colgadas y devuelve `{ ok: false, error: ... }`.
