---
name: miolo-app-arch
description: Standard architecture patterns for miolo applications. Use when creating, modifying, or reviewing miolo applications to ensure proper project structure, directory organization, and file placement following miolo conventions established in miolo-sample.
---

# Miolo Application Architecture

This skill defines the standard architecture for miolo applications, based on modern best practices (as seen in `miolo-sample`).

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
├── db/                   # Database initialization scripts and files
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

### db/

Database initialization scripts:
- `init.sh` - Database creation and setup script
- `sql/` - SQL migration files (executed in alphabetical order)

### build/

Production build output (generated, not versioned):
- `cli/` - Built client application
- `server/` - Built server application

Created by `npm run build`, used in production deployment.

### src/cli/

Client-side React application code. Utilizes **React Router v7** for client routing and deeply integrates **React Contexts** for state management. **Fixed subdirectory structure**:

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

**Rules & Best Practices:**
- Respect the subdirectory structure
- **React Contexts**: Contexts are heavily prioritized for global state, data caching, and UI management. 
- **Client Routing**: Uses `react-router` v7. Main split happens in `Index.jsx` based on session state (using contexts).
- Pages go in `pages/`, grouped by feature
- Reusable UI components in `components/`

### src/ns/

Shared code accessible from both client and server:

```
src/ns/
└── models/              # Data models (using miolo-model)
    ├── base/            # Base classes
    └── ...              # Application-specific models
```

**miolo-model**: Utilize the `miolo-model` package to define robust data models that can be seamlessly validated and used across both client and server.

### src/server/

Backend server code. **Fixed subdirectory structure**:

```
src/server/
├── server.mjs           # Server entry point
├── bot/                 # Scripts to run from cron or console
├── io/                  # Data I/O layer
│   ├── cache/           # Cache layer between DB and outside world (naming: ch_)
│   └── db/              # Database operations only. Uses schemas. (naming: db_)
│       ├── users/       # User-related queries
│       └── ...          # Feature-specific query directories
├── miolo/               # Miolo server configuration
│   ├── auth/            # Authentication strategies
│   ├── cache.mjs        # Cache configuration
│   ├── db.mjs           # Database configuration
│   ├── http.mjs         # HTTP configuration
│   ├── index.mjs        # Main miolo config
│   ├── routes/          # Base route configuration
│   └── ssr/             # Server-side rendering entry and loader
├── routes/              # Centralized GET/POST routes. Index all r_ functions.
│   ├── index.mjs        # Route registration
│   ├── users/           # User endpoints
│   └── ...              # Feature-specific route directories
├── trigger/             # Outgoing functionalities: mailing, messaging, notifications.
└── utils/               # Server utilities
```

**Rules:**
- **`io/db/`**: STRICTLY database operations. Functions must use validation schemas and start with `db_`.
- **`io/cache/`**: Caching layer handling data fetching from DB with a cache mechanism. Functions start with `ch_`.
- **`routes/`**: Centralizes all HTTP endpoints. Functions start with `r_`. These functions pick the request, and call `io/db`, `io/cache`, or `trigger/` as appropriate. Special mention applies to functions used in the `before`/`after` hooks of routes.
- **`trigger/`**: Contains side-effect outgoing modules like emails, push notifications, or webhooks.
- **`bot/`**: CLI or cron scripts meant to execute periodically or via the console.
- **SSR (Server-Side Rendering)**: Configuration and loaders for SSR are stored in `miolo/ssr/`. It speeds up initial load and SEO by preloading data on the server.

### src/static/

Static assets:

```
src/static/
├── fonts/               # Custom fonts
├── img/                 # Images
├── public/              # Public root files (favicon, robots.txt)
└── style/               # Global CSS
```

## Development Workflow

1. **Create app**: `npx miolo create <app-name>`
2. **Develop**: `npm run dev` (hot reload on port from .env)
3. **Build**: `npm run build` (creates production build/)
4. **Deploy**: Use docker/ configuration or build/server/run.mjs

## Best Practices

**Adding static assets:**
- Images: `src/static/img/`
- Fonts: `src/static/fonts/`
- Root files: `src/static/public/`

## Architecture created by `npx miolo create`

The `miolo create` command generates this structure automatically. Maintain it throughout development to ensure consistency with miolo conventions and compatibility with miolo tooling.
