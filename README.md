# miolo
[![NPM Version](https://badge.fury.io/js/miolo.svg)](https://www.npmjs.com/package/miolo)
[![NPM Downloads](https://img.shields.io/npm/dm/miolo.svg?style=flat)](https://www.npmjs.com/package/miolo)

![miolo logo](https://www.afialapis.com/os/miolo/logo.png)

---

> **[miolo](https://academia.gal/dicionario/-/termo/miolo)**. substantivo masculino plural:

> **1.** popular **Encéfalo.**

> _Disque aínda se vían os miolos esparexidos polo chan._

> substantivo masculino:

> **2. Parte interior do pan.**

> _Prefiro o miolo á codia._

> **4.** figurado **Parte fundamental ou máis importante de algo.**

> _O miolo da cuestión non é ese._


---

# Intro

[`miolo`](https://www.afialapis.com/os/miolo) is an all-in-one koa-based server framework for building robust, full-stack web applications. It provides built-in tools for CLI initialization, React frontend integration, authentication, database management, and more.

## Quick Start

Initialize a new miolo application using the CLI:

```bash
npx miolo create my-app
cd my-app
npm run dev
```

This will create a project based on `miolo-sample` with the standard miolo architecture.

# Backend API and Configuration

Miolo provides a comprehensive server API initialized via `miolo(config, render)`.

## Initialization

```javascript
import miolo from 'miolo'

// Server initialization
const config = {
  name: "my-app",
  http: { port: 8001 },
  auth: { /* passport config */ },
  db: { /* db config */ },
  routes: [ /* route definitions */ ],
  cache: { /* cache config */ },
  cron: [ /* cron jobs */ ],
  socket: { enabled: true, namespaces: [] }
}

// Start the server
miolo(config, renderHtmlFn)
```

## Custom `ctx` Properties

Miolo extends the Koa `ctx` object with useful properties and methods:

**Request & General:**
- `ctx.request.body`
- `ctx.request.ip`
- `ctx.miolo` - The core miolo instance (contains `.db`, `.logger`, `.config`, etc.)

**Authentication (via koa-passport):**
- `ctx.isAuthenticated()`
- `ctx.isUnauthenticated()`
- `await ctx.login()`
- `ctx.logout()`
- `ctx.state.user` - Current authenticated user object

**Session / Auth context:**
- `ctx.session.user`
- `ctx.session.authenticated`
- `ctx.session.token` (if using guest auth)

## Configuration Options

The `config` object passed to `miolo()` supports the following top-level keys:

- **`name`** (String): Application name.
- **`http`** (Object): Web server config (`port`, `hostname`).
- **`auth`** (Object): Authentication configuration (`passport`, `basic`, `guest`).
- **`db`** (Object): PostgreSQL database config (host, port, user, max pool, schemas).
- **`routes`** (Array): API route registrations.
- **`cache`** (Object): Caching strategy (e.g., Redis).
- **`cron`** (Array): Scheduled bot tasks.
- **`socket`** (Object): Socket.io real-time configuration.
- **`build.ssr.loader`** (Function): Server-side rendering data loader function.

# Best Practices & Recommendations

To maintain consistency across miolo-based applications, please adhere to the following architecture and patterns (modeled after `miolo-sample`):

## 1. Project Structure

Always maintain the following fundamental directory structure:

```
src/
├── cli/              # React Frontend Application
├── ns/               # Shared models between server & cli
├── server/           # Backend API and Logic
│   ├── bot/          # Cron jobs and CLI scripts
│   ├── io/           # Data fetching and manipulation
│   │   ├── cache/    # Caching layer (naming convention: ch_*)
│   │   └── db/       # Strict DB queries with schemas (naming convention: db_*)
│   ├── miolo/        # Server initialization config (db.mjs, auth.mjs, index.mjs)
│   ├── routes/       # HTTP endpoints logic (naming convention: r_*)
│   └── trigger/      # Side-effects (Mails, Webhooks, Push Notifications)
```

## 2. File Organization & Naming

- **Database Layer (`src/server/io/db/`)**: Contains ALL database interactions. Functions must start with `db_` (e.g., `db_user_read`, `db_item_upsave`). Never write raw SQL inside route handlers.
- **Cache Layer (`src/server/io/cache/`)**: Handles cached data retrieval. Functions must start with `ch_`.
- **Routes Layer (`src/server/routes/`)**: HTTP endpoints. Functions must start with `r_` (e.g., `r_user_login`, `r_item_list`). These functions orchestrate the request and call the `io` or `trigger` layers.
- **Bot/CLI (`src/server/bot/`)**: All background tasks, chron jobs, and CLI tools go here.

## 3. Database Filters

When implementing SELECT queries in `io/db`, always use the `make_query_filter()` utility provided by `miolo`. This prevents SQL injection and provides a standardized way of accepting dynamic WHERE clauses from the client.

## 4. Client Contexts (React)

On the client side (`src/cli/`), deeply integrate React Contexts for global state management. Group UI components in `src/cli/components/`, and pages logically in `src/cli/pages/`.

## 5. UI Libraries (Tailwind & shadcn)

Miolo supports easy integration with modern frontend tools.

**Tailwind CSS (v4):**
In your CSS entry, just add:
```css
@import "tailwindcss";
```
No `tailwind.config.js` or `postcss.config.js` is needed. Use CSS `@theme` rules instead.

**shadcn/ui Integration:**
Install dependencies:
```bash
npm install class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
```
Ensure your `components.json` and `jsconfig.json` use the `#cli/*` alias paths provided by default in miolo projects.

# Changelog

See [changelog here](https://github.com/afialapis/miolo/blob/main/CHANGELOG.md)
