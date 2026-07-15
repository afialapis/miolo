---
sidebar_position: 3
---

# Arquitectura y Estructura

Las aplicaciones generadas con Miolo siguen una estructura estándar basada en mejores prácticas para aplicaciones *fullstack* modernas. Esta estructura ha sido diseñada para garantizar separación de responsabilidades y compatibilidad con todas las herramientas de Miolo.

## Estructura Raíz

En la raíz del proyecto encontrarás la configuración principal:

```text
mi-app/
├── package.json          # Scripts npm e import aliases
├── .env                  # Variables de entorno
├── jsconfig.json         # Configuración de rutas JavaScript
├── build/                # Directorio autogenerado para el código en producción
├── db/                   # Scripts de base de datos
├── src/                  # Código fuente de tu aplicación
└── docker/               # Ficheros de despliegue y orquestación
```

## Directorio Source (`src/`)

El núcleo de la aplicación se divide estrictamente en 4 áreas principales, las cuales están mapeadas mediante `import aliases` (ej. `#server/` o `#cli/`):

### 1. Servidor (`src/server/`)
Todo el código del backend, endpoints y lógica de negocio.
- `server.mjs`: Punto de entrada principal.
- `routes/`: Enrutamiento centralizado HTTP (`r_`).
- `io/`: Capa de operaciones de entrada y salida, subdividida en `db/` (consultas puras a BD) y `cache/` (lógica intermedia).
- `miolo/`: Ficheros de configuración específicos (autenticación, caché, ssr, base de datos).

### 2. Cliente (`src/cli/`)
La aplicación React.
- `App.jsx` y `entry-cli.jsx`: Entradas de la aplicación y del cliente (CSR).
- `pages/`: Componentes organizados por rutas/pantallas.
- `components/`: Componentes reutilizables (UI base, Shadcn, etc.).
- `context/`: Gestión de estado de React.
- `layout/`: Estructuras de la aplicación (barras de navegación, pie de página).

### 3. Namespace Compartido (`src/ns/`)
Código accesible tanto en el backend como en el frontend (Isomorphic JS).
- Aquí suelen vivir los **Modelos de datos** (`src/ns/models/`). Esto garantiza que el cliente y el servidor manejen exactamente las mismas reglas de validación y estructura.

### 4. Estáticos (`src/static/`)
Activos que deben ser accesibles públicamente:
- `img/`, `fonts/`
- `public/` (ej. `robots.txt`, favicon)
- `style/` (CSS globales o configuración de Tailwind)

## Import Aliases Recomendados

Para facilitar el acceso al código y evitar rutas relativas largas (`../../../`), Miolo recomienda y configura aliases por defecto en el `package.json`:

```json
{
  "imports": {
    "#cli/*": "./src/cli/*",
    "#ns/*": "./src/ns/*",
    "#server/*": "./src/server/*",
    "#static/*": "./src/static/*"
  }
}
```

Usando esta estructura y respetando los límites de cada directorio, tu aplicación escalarará de forma limpia a lo largo de su ciclo de vida.
