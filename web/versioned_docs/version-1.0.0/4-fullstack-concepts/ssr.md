---
sidebar_position: 1
---

# Server-Side Rendering (SSR) y Carga de Datos

El motor de Server-Side Rendering de Miolo garantiza que las páginas se envíen al cliente con los datos iniciales pre-cargados, lo que mejora drásticamente el tiempo de primer renderizado (FCP) y el SEO, evitando que el usuario vea pantallas en blanco o indicadores de carga continuos.

El proceso se divide en la parte de Back-end (donde obtenemos los datos) y en el Front-end (donde los consumimos e hidratamos).

## 1. El Cargador en Servidor (`loader.mjs`)

El archivo `src/server/miolo/ssr/loader.mjs` es el encargado de interceptar las peticiones HTTP que llegan al servidor para renderizar la interfaz React. Su trabajo es ejecutar consultas a base de datos y construir un objeto JSON que se inyectará en la respuesta HTML.

```javascript
import { db_todo_read } from '#server/io/db/todos/read.mjs'

const loader = async (ctx) => {
  // Inicializamos con valores seguros por defecto
  const data = {
    todos: []
  }
  
  // Utilizamos try/catch para evitar que un fallo en la DB impida 
  // cargar la página (el cliente puede reintentar si SSR falla)
  try {
    data.todos = await db_todo_read(ctx, {})
  } catch (_) {}
  
  return data
}

export { loader }
```

### Optimizaciones de Rendimiento del Loader

Para no sobrecargar la base de datos, debes cargar **únicamente los datos necesarios para la URL actual** del usuario. Puedes leer `ctx.request.url` para decidir:

```javascript
const loader = async (ctx) => {
  const url = ctx.request.url
  const data = {}

  if (url.startsWith('/dashboard')) {
    data.stats = await db_dashboard_stats(ctx)
  }

  // Comprobar si hay sesión antes de cargar información confidencial
  if (ctx.session.authenticated && url.startsWith('/profile')) {
    data.profile = await db_user_profile(ctx, { id: ctx.session.user.id })
  }

  return data
}
```

## 2. Consumo en React (`useSsrData`)

El cliente hidratará los datos devueltos por el `loader` gracias al hook `useSsrData`. Este hook actúa de forma inteligente: si encuentra la clave en los datos pre-cargados del SSR, los usará instantáneamente. Si no la encuentra (por ejemplo, tras navegar en el cliente), ejecutará una petición HTTP.

### Sintaxis

```javascript
const [data, setData, refreshData] = useSsrData(
  '<key>',           // 1. La misma clave devuelta en el loader (ej: 'todos')
  defaultValue,      // 2. Valor inicial (ej: [])
  remoteLoader       // 3. Función async de rescate si el SSR falló/no tenía la clave
)
```

### Ejemplo de Implementación Completo

Normalmente, el consumo del SSR se agrupa en un contexto global (como `DataProvider`) o en la raíz de un contenedor de página.

```javascript
import { useState } from 'react'
import useSessionContext from '#cli/context/session/useSessionContext.mjs'

export default function DataProvider({ children }) {
  const [status, setStatus] = useState('loaded')
  const { useSsrData } = useSessionContext()

  const [todos, setTodos, refreshTodos] = useSsrData(
    'todos', // <--- Tiene que coincidir EXACTAMENTE con el loader.mjs
    [],      // Valor por defecto
    async (context, fetcher) => {
      // 🚨 Esto SÓLO se ejecutará si falló el SSR o si llamas a refreshTodos()
      setStatus('loading')
      const { data } = await fetcher.get('/api/todo/list')
      setStatus('loaded')
      return data
    }
  )

  return (
    <DataContext.Provider value={{ todos, refreshTodos, loading: status === 'loading' }}>
      {children}
    </DataContext.Provider>
  )
}
```

### Modificación de Datos (Mutaciones)

Si el usuario elimina una Tarea o actualiza el nombre de su perfil, quieres que el frontend se actualice de forma reactiva. Existen dos formas de hacerlo:

1. **Refresco forzado (`refreshData`)**:
   Tras ejecutar el `POST` al servidor, puedes invocar la función de rescate para volver a pedir todos los datos actualizados a la API.
   ```javascript
   await fetcher.post('/api/todo/delete', { id })
   refreshTodos() // Llama al remoteLoader internamente
   ```

2. **Actualización optimista (`setData`)**:
   Puedes actualizar directamente el array/objeto visual que la UI está pintando para que el cambio se perciba instantáneamente en pantalla, sin esperar confirmación del servidor.
   ```javascript
   const nuevosTodos = todos.filter(t => t.id !== id)
   setTodos(nuevosTodos)
   ```

## Resumen

- Envía todos los datos pesados en la primera carga inyectándolos en el JSON que devuelve el `loader.mjs`.
- Las claves del JSON devuelto en `loader.mjs` deben ser iguales al primer parámetro del hook `useSsrData`.
- Protege los bloques del loader con `try/catch`. Nunca permitas que una excepción del loader bloquee la carga visual de React.
