---
sidebar_position: 3
---

# Sesión de Usuario (Session Context)

Gestionar de forma unificada la identidad del usuario, su estado de autenticación y sus permisos es un requerimiento esencial en cualquier aplicación. Miolo proporciona herramientas sólidas tanto en la capa Back-end como en el cliente de React.

## En el Servidor (Backend)

Dentro de los endpoints y controladores HTTP (rutas en `src/server/routes/`), el objeto de contexto (`ctx`) provee acceso directo al estado de la sesión, independientemente del método de autenticación configurado (Passport, Basic, etc).

### Verificación de Estado

```javascript
export async function r_get_profile(ctx, params) {
  // 1. Verificar el estado
  if (!ctx.session.authenticated) {
    return { ok: false, error: 'Acceso denegado.' }
  }
  
  // 2. Acceder al usuario
  const user = ctx.session.user
  
  return { ok: true, data: { email: user.email, name: user.name } }
}
```

**Propiedades comunes en `ctx.session`**:
- `user`: El objeto completo con los datos del usuario extraídos de la BD. Si no hay sesión, será nulo o indefinido.
- `authenticated`: Booleano puro que indica si la sesión actual es válida.
- `auth_method`: Cadena de texto indicando cómo se validó (`local`, `google`, etc).

> [!NOTE]
> **Si usas la estrategia por defecto de Contraseña (Local auth):**
> También dispones de métodos directos como `ctx.isAuthenticated()`, `ctx.login(username, pass)` y `ctx.logout()`.

## En el Cliente (React)

En el Front-end, el ciclo de vida de la sesión está gestionado por la conjunción de la librería del núcleo `miolo-react` y el Proveedor implementado a nivel de proyecto (`SessionProvider`).

### El origen: `useMioloContext`

El paquete central expone los mecanismos internos básicos a través del hook `useMioloContext()`:

```javascript
import { useMioloContext } from 'miolo-react'

function LoginForm() {
  const { login } = useMioloContext()
  // login({ username, password }) validará y automáticamente populará
  // la sesión en todo el Front-end si tiene éxito.
}
```

Sus propiedades principales son:
- `user`: Datos del usuario actual.
- `updateUser(userData)`: Permite sobrescribir reactivamente los datos locales del usuario tras, por ejemplo, actualizar el perfil.
- `authenticated`: `true/false`.
- `fetcher`: Un wrapper de peticiones HTTP (Axios) pre-autorizado.
- `login() / logout()`: Gestión del ciclo de vida.

### Envoltura de Proyecto: `SessionProvider`

Dado que cada aplicación tiene sus propios requisitos de dominios y Permisos, Miolo genera por ti un "wrapper" o envoltorio en `src/cli/context/session/SessionProvider.jsx`. 

Este proveedor consume internamente `useMioloContext`, pero expone al resto del árbol de React información adicional de valor, como el módulo de **Permisos** (`permiss`).

```javascript
// Ejemplo de uso en cualquier componente interno:
import useSessionContext from '#cli/context/session/useSessionContext.mjs'

function UserSettings() {
  const { 
    session,        // Alias directo de "user"
    permiss,        // Objeto calculador de permisos/roles
    authenticated, 
    logout 
  } = useSessionContext()

  if (!authenticated) return null;

  return (
    <div>
      <p>Conectado como {session.name}</p>
      
      {/* Comprobar privilegios administrativos usando la función can() */}
      {permiss.can('admin_access') && (
        <button>Panel de Control Oculto</button>
      )}

      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  )
}
```

### Actualización del Usuario Local

Si en tu vista de perfil el usuario actualiza su foto o su email haciendo un envío `POST` al backend, puedes mantener tu UI 100% sincronizada usando `updateUser` que Miolo inyecta desde la capa superior:

```javascript
import { useMioloContext } from 'miolo-react'

// Dentro de tu submit handler:
const { updateUser } = useMioloContext()

const response = await fetch('/api/user/update', { method: 'POST', body })
const data = await response.json()

if (data.ok) {
  // Al invocar esto, el SessionProvider, las cabeceras, layouts y 
  // cualquier vista que dependa del usuario, se re-renderizará al instante.
  updateUser(data.nuevoUsuario) 
}
```
