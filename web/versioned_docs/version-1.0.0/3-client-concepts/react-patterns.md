---
sidebar_position: 2
---

# Patrones React en Miolo

Miolo establece un conjunto de convenciones estrictas para la arquitectura y el código de las aplicaciones React (`src/cli/`) destinadas a garantizar la máxima legibilidad, mantenimiento y tipado (JSDoc) en todo el ciclo de vida del frontend.

## Estructura de Directorios

Todos los componentes de cliente residen en `src/cli/`. Sigue esta taxonomía:

- `components/`: Componentes UI reutilizables (botones, tablas). Incluye `components/ui/` para implementaciones base (como shadcn/ui).
- `context/`: Gestión de estado global de React.
- `hooks/`: Hooks personalizados (`useWindowSize`, `useLocalStorage`, etc).
- `layout/`: Estructuras maestras de la página (Navbars, Sidebars).
- `lib/`: Utilidades sin estado y funciones puras de JavaScript.
- `pages/`: Vistas completas, agrupadas por "Feature" o dominio (ej. `pages/dash/`, `pages/users/`).

## El Patrón de Contexto (Context Pattern)

Para evitar la "perforación de propiedades" (Prop Drilling) y disponer de un Autocompletado 100% funcional en el IDE, **todos los contextos deben crearse en tres archivos separados**.

### 1. Definición (`SessionContext.mjs`)

Crea y exporta el contexto vacío. **Extensión `.mjs`** porque no tiene JSX.

```javascript
import { createContext } from 'react'

const SessionContext = createContext()
export default SessionContext
```

### 2. El Proveedor (`SessionProvider.jsx`)

Aquí se ubica la lógica de estado y (muy importante) **se define la estructura JSDoc** para que el IDE sepa qué devuelve el contexto.

```javascript
import { useState } from 'react'
import SessionContext from './SessionContext.mjs'

/**
 * Define el contrato del contexto para el Autocompletado
 * @typedef {Object} SessionContextData
 * @property {Object} user El usuario actual
 * @property {boolean} loading
 * @property {Function} logout
 */

export default function SessionProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  /** @type {SessionContextData} */
  const value = { user, loading, logout: () => setUser(null) }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}
```

### 3. El Hook Consumidor (`useSessionContext.mjs`)

Un hook personalizado que recupera el tipo JSDoc desde el archivo del Proveedor e intercepta la lectura para garantizar que se usa dentro del provider correspondiente.

```javascript
import { useContext } from 'react'
import SessionContext from './SessionContext.mjs'

/**
 * @typedef {import("./SessionProvider.jsx").SessionContextData} SessionContextData
 */

/**
 * @returns {SessionContextData}
 */
export default function useSessionContext() {
  const context = useContext(SessionContext)
  
  if (!context) throw new Error('Debe usarse dentro de SessionProvider')
  
  return context
}
```

Con este patrón de 3 archivos, al escribir `const { } = useSessionContext()` en cualquier componente, el editor sugerirá inmediatamente `user`, `loading`, y `logout`.

## Convenciones de Código

### Import Aliases

Utiliza siempre importaciones absolutas a través de los alias preconfigurados (empezando por `#cli/` para frontend o `#ns/` para lógica de negocio compartida) en lugar de relativas.

```javascript
// ✅ CORRECTO
import Button from '#cli/components/ui/button.jsx'

// ❌ INCORRECTO (Propenso a romperse al mover archivos)
import Button from '../../../components/ui/button.jsx'
```

### Destructuración de Propiedades

Extrae explícitamente las props en la firma de la función. Evita depender de `props.objeto`.

```javascript
// ✅ CORRECTO
export default function TodoItem({ todo, onToggle }) {
  return <div>{todo.title}</div>
}

// ❌ INCORRECTO
export default function TodoItem(props) {
  return <div>{props.todo.title}</div>
}
```

### Manejo de Estados Asíncronos

Es obligatorio implementar y renderizar estados de carga (`loading`) y error (`error`) explícitos cuando se obtienen datos (fetch), para prevenir bloqueos de pantalla o fallos catastróficos silenciosos.

```javascript
if (loading) return <div>Cargando datos...</div>
if (error) return <div>Ha ocurrido un error: {error}</div>
if (!data) return <div>No se han encontrado resultados.</div>

return <div>{/* Renderizado real */}</div>
```
