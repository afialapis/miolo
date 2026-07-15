---
sidebar_position: 2
---

# `miolo` (Server)

Este es el paquete principal para la infraestructura de Backend. Contiene el inicializador del servidor, utilidades de esquemas, gestores de bases de datos y herramientas del sistema (cron, logs, caché).

> **Uso:** Importado exclusivamente en el entorno de Node (`src/server/`).

## 1. Inicialización: `miolo(config)`

La función `miolo` es la pieza central del framework. Se encarga de inicializar Koa, montar la base de datos, configurar WebSockets, sesiones, caché, Vite en modo SSR y levantar el puerto HTTP.

Recibe un único argumento `config`, un objeto inmenso donde defines el comportamiento de tu aplicación. 

Muchas opciones tienen un valor por defecto que puede sobreescribirse mediante variables de entorno (ej. `MIOLO_PORT`).

### Objeto de Configuración (`config`)

A continuación se detallan las secciones principales del objeto de configuración:

```javascript
import { miolo } from "miolo"

const app = await miolo({
  name: "miolo", // MIOLO_NAME
  
  // -------------------------
  // 1. Servidor HTTP
  // -------------------------
  http: {
    port: 8001,
    hostname: "localhost",
    ssl: undefined, // o { key, cert } para HTTPS directo
    static: {
      favicon: "ruta/al/favicon.ico",
      headers: { "/sw.js": { "Cache-Control": "..." } },
      folders: {
        "/build": "rutas/absolutas/build",
        "/": "rutas/public"
      }
    },
    cors: false, // true, false, "simple" o un objeto de configuración
    proxy: false, // Habilitar si estás detrás de un proxy inverso (Nginx/Traefik)
    ratelimit: {
      max: 1000,
      duration: 60000,
      whitelist_ips: [],
      blacklist_ips: []
    },
    request: {
      lazy: 1, // Segundos para loggear un request como "lazy"
      slow: 2, // Segundos para loggear como "slow"
      geoip: { enabled: false } // Resolución de IP
    }
  },

  // -------------------------
  // 2. Sesiones
  // -------------------------
  session: {
    salt: "SUPER_SALTY_YES?",
    secret: "SUPER_SECRET_KEY", // MIOLO_SESSION_SECRET
    options: {
      key: "koa.sess",
      maxAge: 86400 * 10 * 1000, // 10 días
      renew: true,
      secure: false, // `true` en producción con HTTPS
      sameSite: "lax" // Necesario para OAuth (Google Auth)
    }
  },

  // -------------------------
  // 3. Base de Datos (PostgreSQL o SQLite)
  // -------------------------
  db: {
    config: {
      dialect: "postgres", // o sqlite
      host: "localhost",
      port: 5432,
      database: "miolo_db",
      user: "user",
      password: "pwd",
      max: 5, // Conexiones máximas del Pool
      min: 0,
      idleTimeoutMillis: 10000
    }
  },

  // -------------------------
  // 4. Enrutamiento y API
  // -------------------------
  routes: {
    crud: [],     // Arrays de modelos CRUD automáticos
    queries: [],  // Declaración de todos tus endpoints manuales
    bodyField: undefined 
  },

  // -------------------------
  // 5. Logging (Ficheros, Consola y Correo)
  // -------------------------
  log: {
    level: "debug",
    console: { enabled: true, level: "debug" },
    file: {
      enabled: false,
      level: "debug",
      filename: "/var/log/afialapis/%MIOLO%.log",
      zippedArchive: true,
      maxsize: 20971520 // 20MB
    },
    mail: {
      enabled: false, // Si es true, envía un correo ante errores críticos
      level: "warn",
      from: "noreply@mail.com",
      to: "admin@mail.com"
    }
  },

  // -------------------------
  // 6. Configuración de Correo (SMTP)
  // -------------------------
  mail: {
    silent: false,
    options: {
      port: 25,
      host: "mail.com",
      authMethod: "PLAIN",
      auth: { user: "...", pass: "..." }
    }
  },

  // -------------------------
  // 7. Autenticación (Estrategias)
  // -------------------------
  auth: {
    // basic: { ... }
    // guest: { make_guest_token: () => {} }
    // passport: {
    //   local_auth_user: async (username, password) => { ... },
    //   google_auth_user: async (token, refresh, profile) => { ... }
    // }
  },

  // -------------------------
  // 8. Tareas Programadas (Cron)
  // -------------------------
  cron: [
    // { name: "Limpiar temporales", cronTime: "0 0 * * *", onTick: async () => {} }
  ],

  // -------------------------
  // 9. Caché Global (Memoria o Redis)
  // -------------------------
  cache: {
    default: {
      type: "combined", // Memoria RAM local + Redis distribuido
      redis: { host: "127.0.0.1", port: 6379 }
    },
    session: { namespace: "miolo-session" }
  },

  // -------------------------
  // 10. WebSockets (Socket.io)
  // -------------------------
  socket: {
    enabled: true,
    userRooms: false, // true = Une a un usuario automáticamente a 'user_<id>'
    ssr: { enabled: true, namespace: "ssr" } // Recarga reactiva SSR
  },

  // -------------------------
  // 11. Compilación (Vite + SSR)
  // -------------------------
  build: {
    client: process.env.NODE_ENV === "production" ? "build/cli/bundle.min.js" : "./src/cli/index.js",
    html: "./src/cli/index.html",
    vite: { base: "/", ssr: { noExternal: ["miolo-react"] } },
    ssr: { server: "./src/server/ssr/entry-server.jsx" },
    dev: { watcher: { enabled: true, dirs: [] } } // Recarga del Backend
  }
})
```

---

## 2. Otras Utilidades Exportadas

### Caché y Tareas Programadas
- **`miolo_cacher`**: Instancia directa del wrapper `cacheiro` subyacente.
- **`miolo_cron`**: Instanciador de tareas cronométricas usando la sintaxis crontab subyacente de `kelektiv/node-cron`.

### Base de Datos
- **`miolo_db_connection_pg`**: Función pura para extraer o verificar la conexión primaria del pool de Postgres.
- **`miolo_db_drop_connections`**: Fuerza el vaciado o destrucción del Pool de conexiones de base de datos (Útil durante cierres limpios SIGTERM).

### Loggers y Parsers
- **`miolo_logger`**: Inicializa la máquina interna de logs (Winston).
- **`miolo_emailer`**: Exporta el wrapper SMTP de Nodemailer inicializado para envíos asíncronos programáticos.
- **`miolo_parser`**: Motor de recolección de cuerpo de peticiones y variables HTTP.

### Validación de Datos (Joi)
- **`with_miolo_input_schema`**: Envuelve una función asíncrona para validar automáticamente sus parámetros (`params`) con Joi antes de la ejecución. Devuelve un error `400 Bad Request` controlado si no se cumple.
- **`with_miolo_output_schema`**: Asegura que el objeto retornado por una función coincida con un esquema Joi, recortando propiedades adicionales. Útil para evitar devolver contraseñas cifradas o secretos en el JSON del endpoint.
