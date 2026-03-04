---
name: miolo-app-arch
description: Standard architecture patterns for miolo applications. Use when creating, modifying, or reviewing miolo applications to ensure proper project structure, directory organization, and file placement following miolo conventions established in miolo-sample.
---

# Miolo Application Architecture

This skill defines the standard architecture for miolo applications based on miolo-sample, the reference implementation for miolo apps.

## Project Structure Overview

```
miolo-app/
├── package.json          # npm scripts and dependencies
├── .env                  # Development environment variables
├── .env.production       # Production environment variables  
├── .editorconfig         # Editor configuration
├── .gitignore            # Git ignore rules
├── components.json       # shadcn/ui configuration
├── jsconfig.json         # JavaScript/Import path configuration
├── biome.json            # Biome configuration
├── postcss.config.js     # PostCSS/Tailwind configuration
├── docker/               # Docker deployment configuration
├── db/                   # Database initialization (optional)
├── build/                # Production build output
├── src/                  # Source code
│   ├── cli/              # Client-side React application
│   ├── ns/               # Shared code (namespace)
│   ├── server/           # Backend server code
│   └── static/           # Static assets
```

## Root Files

### package.json Scripts

Standard npm scripts for miolo development and deployment:

```json
{
  "scripts": {
    "reset": "rm -fr node_modules package-lock.json && npm i",
    "lint": "biome check ./src --reporter=github",
    "lint:fix": "biome check --write ./src --reporter=github",
    "dev": "npx miolo dev",
    "deb": "npx miolo deb",
    "create-bin": "npx miolo create-bin",
    "build": "npx miolo build && npm run create-bin",
    "start": "node ./build/server/run.mjs start",
    "stop": "node ./build/server/run.mjs stop",
    "restart": "node ./build/server/run.mjs restart"
  }
}
```

**Key scripts:**
- `dev` - Development mode with hot reload
- `deb` - Development mode with hot reload and debugging
- `build` - Complete production build
- `start/stop/restart` - Production server management

### Import Aliases

Configure path aliases in `package.json`:

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

Use these aliases consistently in imports: `import Thing from '#server/routes/thing.mjs'`

### Environment Files

- `.env` - Development configuration (database, ports, session salt, etc.)
- `.env.production` - Production overrides

## Directory Structure

### docker/

Docker deployment configuration:
- `docker-compose.yaml` - Service orchestration
- `Dockerfile` - Container build instructions

### db/ (optional)

Database initialization scripts:
- `init.sh` - Database creation and setup script
- `sql/` - SQL migration files (executed in alphabetical order)

Not required for all apps, but recommended for PostgreSQL-based applications.

### build/

Production build output (generated, not versioned):
- `cli/` - Built client application
- `server/` - Built server application

Created by `npm run build`, used in production deployment.

### src/cli/

Client-side React application code. **Fixed subdirectory structure**:

```
src/cli/
├── App.jsx              # Root application component
├── entry-cli.jsx        # Client entry point
├── index.html           # HTML template
├── components/          # React components (shadcn/ui, custom)
│   ├── ui/              # shadcn/ui components
│   └── ...              # Custom components
├── config/              # Client configuration
├── context/             # React contexts (data, session, theme, ui)
│   ├── data/
│   ├── session/
│   ├── theme/
│   └── ui/
├── hooks/               # Custom React hooks
├── layout/              # Layout components (sidebar, nav, etc.)
├── lib/                 # Client utilities
└── pages/               # Page components
    ├── dash/            # Dashboard pages
    ├── offline/         # Unauthenticated pages (login, etc.)
    └── ...              # Feature-specific page directories
```

**Rules:**
- Respect the subdirectory structure
- Place new components in appropriate subdirectories
- Pages go in `pages/`, grouped by feature
- Reusable UI components in `components/`
- Contexts follow the established pattern (Context.jsx, Provider.jsx, useContext.mjs)

### src/ns/

Shared code accessible from both client and server:

```
src/ns/
└── models/              # Data models
    ├── base/            # Base classes (BaseModel, BaseArray, etc.)
    └── ...              # Application-specific models
```

Use for code that needs to run in both environments.

### src/server/

Backend server code. **Semi-fixed subdirectory structure**:

```
src/server/
├── server.mjs           # Server entry point
├── cache/               # Cache implementations
├── db/                  # Database layer
│   ├── io/              # Database I/O operations (queries)
│   │   ├── users/       # User-related queries
│   │   ├── todos/       # Example: todo queries
│   │   └── ...          # Feature-specific query directories
│   └── triggers/        # Database triggers
├── lib/                 # Server libraries
├── miolo/               # Miolo server configuration
│   ├── auth/            # Authentication strategies
│   ├── cache.mjs        # Cache configuration
│   ├── cron/            # Cron jobs
│   ├── db.mjs           # Database configuration
│   ├── http.mjs         # HTTP configuration
│   ├── index.mjs        # Main miolo config
│   ├── routes/          # Base route configuration
│   └── ssr/             # Server-side rendering
├── routes/              # API endpoints (developers add here)
│   ├── index.mjs        # Route registration
│   ├── users/           # User endpoints
│   └── ...              # Feature-specific route directories
└── utils/               # Server utilities
```

**Rules:**
- `cache/`, `lib/`, `utils/`, `miolo/` are relatively fixed
- **Developers add new API endpoints in `routes/`**
- **Database queries go in `db/io/`**, organized by domain
- Each route directory contains endpoint handlers
- Register new routes in `routes/index.mjs`

**Key pattern:** When adding a new feature:
1. Create queries in `db/io/feature-name/`
2. Create route handlers in `routes/feature-name/`
3. Register routes in `routes/index.mjs`

### src/static/

Static assets:

```
src/static/
├── fonts/               # Custom fonts
├── img/                 # Images
│   ├── default/         # Default images (avatars, etc.)
│   └── ...
├── public/              # Public root files (favicon, robots.txt)
└── style/               # Global CSS
```

## Development Workflow

1. **Create app**: `npx miolo create <app-name>`
2. **Develop**: `npm run dev` (hot reload on port from .env)
3. **Build**: `npm run build` (creates production build/)
4. **Deploy**: Use docker/ configuration or build/server/run.mjs

## Best Practices

1. **Respect directory structure** - Don't create new top-level directories without reason
2. **Use import aliases** - Always use `#cli/`, `#server/`, etc. for imports
3. **Follow naming conventions** - Use lowercase with hyphens for directories, camelCase for files
4. **Organize by feature** - In routes/ and db/io/, group by domain/feature
5. **Keep server config in miolo/** - Don't modify unless necessary
6. **Use contexts for state** - Follow established context patterns in cli/context/

## Common Patterns

**Adding a new feature:**
```
1. Add database queries: src/server/db/io/myfeature/*.mjs
2. Add API routes: src/server/routes/myfeature/*.mjs
3. Register routes: src/server/routes/index.mjs
4. Add client pages: src/cli/pages/myfeature/*.jsx
5. Add components if needed: src/cli/components/myfeature/*.jsx
```

**Adding authentication:**
- Strategies in `src/server/miolo/auth/`
- Configure in `src/server/miolo/index.mjs`

**Adding static assets:**
- Images: `src/static/img/`
- Fonts: `src/static/fonts/`
- Root files: `src/static/public/`

## Architecture created by `npx miolo create`

The `miolo create` command generates this structure automatically. Maintain it throughout development to ensure consistency with miolo conventions and compatibility with miolo tooling.
