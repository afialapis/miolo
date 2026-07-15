---
sidebar_position: 4
---

# Autenticación y Sesiones

Miolo proporciona una arquitectura de autenticación robusta y flexible, soportando diferentes estrategias que se configuran de manera centralizada. 

Las estrategias de autenticación viven en `src/server/miolo/auth/`.

## Estrategias Soportadas

1. **Passport.js** (`passport.mjs`): La opción más recomendada. Soporta tanto login clásico (usuario y contraseña) como autenticación mediante **Google OAuth2** de manera simultánea.
2. **Basic** (`basic.mjs`): Autenticación HTTP Basic simple, útil para APIs o accesos de máquina a máquina.
3. **Guest** (`guest.mjs`): Acceso anónimo o de invitado.

Para habilitar una u otra, simplemente debes exportarla en la configuración principal del servidor `src/server/miolo/index.mjs`:

```javascript
import passport from './auth/passport.mjs'

export default {
  auth: {
    passport 
  }
}
```

## Estrategia Passport (Local + Google OAuth2)

La estrategia de Passport ya viene preconfigurada para integrarse con la tabla de `account` de tu base de datos mediante las funciones `db_auth_user` y `db_find_user_by_id`.

### Login Local (Usuario/Contraseña)

Miolo utiliza un sistema seguro de hashing de contraseñas mediante SHA512 y "Salts" criptográficos.

**Variables de entorno requeridas:**
```env
MIOLO_SESSION_SALT=tu-salt-secreto
MIOLO_SESSION_SECRET=secreto-para-firmar-cookies
```

**Flujo:**
El usuario envía un POST a `/login` con `username` y `password`. La base de datos aplica el hash al password introducido y lo compara con el almacenado. Si es correcto, Miolo crea automáticamente la cookie de sesión.

> [!TIP]
> **Triggers de Base de datos**
> El hash de la contraseña nunca debe hacerse manualmente. Miolo incluye un trigger en `io/db/triggers/user.mjs` que intercepta la inserción de un usuario (cuando se registra) y le aplica el `sha512` automáticamente antes de guardarlo en la base de datos.

### Google OAuth2

Para permitir a los usuarios iniciar sesión con su cuenta de Google, simplemente debes configurar las siguientes variables de entorno:

```env
MIOLO_AUTH_GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
MIOLO_AUTH_GOOGLE_CLIENT_SECRET=tu-client-secret
MIOLO_AUTH_GOOGLE_CALLBACK_URL=http://localhost:8001/auth/google/callback
```

**Flujo en el Frontend:**
Para invocar el login con Google, el cliente NO debe hacer una petición AJAX/Fetch (ya que causará un error CORS redirigiendo a los servidores de Google). Debe utilizar navegación directa:

```jsx
// Correcto ✅
<button onClick={() => window.location.href = '/auth/google'}>
  Login con Google
</button>
```

> [!WARNING]
> **Política de Cookies (SameSite)**
> Para que el flujo de OAuth2 funcione correctamente y el navegador no bloquee la cookie tras regresar de Google, es obligatorio configurar `sameSite: 'lax'` en las opciones de sesión (`packages/miolo/src/config/defaults.mjs` o a nivel de app).

## Proteger Rutas

Una vez que el usuario ha iniciado sesión, puedes proteger cualquier ruta del backend simplemente añadiendo la configuración `auth` en la definición de la ruta (`routes/index.mjs`):

```javascript
// Si no hay sesión, será redirigido
const auth = {
  require: true,
  action: 'redirect',
  redirect_url: '/page/login'
}

export default [{
  prefix: 'api',
  routes: [
    { method: 'GET', url: '/private/data', auth, callback: r_private_data }
  ]
}]
```

Dentro del controlador de la ruta (`r_private_data`), podrás acceder al usuario de la siguiente manera:

```javascript
export async function r_private_data(ctx, params) {
  const user = ctx.state.user // Información del usuario extraída de la BD
  
  if (user.active !== 1) {
    return { ok: false, error: 'Usuario inactivo' }
  }
}
```
