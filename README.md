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

[`miolo`](https://www.afialapis.com/os/miolo) is an all-in-one koa-based server.


## Server middleware

## init

```miolo(config, render)```

config: ver defaults.js

render:
	undefined         => renderiza un html fallback
	html     (string) => renderiza ese HTML
	middleware        => renderiza HTML con posibilidad de SSR

### Custom `ctx` properties

  ctx.request.body
  ctx.request.ip

  From koa-passport:

  ctx.isAuthenticated()
  ctx.isUnauthenticated()
  await ctx.login()
  ctx.logout()
  ctx.state.user

  From auth:
    ctx.session.user
    ctx.session.authenticated
    ctx.session.token (if guest auth)
                 

# Use `tailwind`

In your css entry:

```css
@import "tailwindcss";
```

No need of `postcss.config.js`
No need of `tailwind.config.js` => use CSS @theme and company instead


# Use `shadcn`

```sh
npm install class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
```

`miolo` config:
```js
  # build: {
  #   vite: {
  #     resolve: {
  #       alias: {
  #         "@": path.resolve(proot('cli')),
  #       },
  #     },        
  #   }
  # }
```

Ensure `package.json`:

```json
  "imports": {
    "#cli/*": "./src/cli/*",
    ...
  },
```

Modify `jsconfig.json`:

```json
{
  "compilerOptions": {
    ...
    "baseUrl": "./",
    "paths": {
      ...
      "#cli": ["./src/cli"],    
    }    
  }
  ...
}
```

Create `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "",
    "css": "src/cli/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    // Must be relative to the baseUrl defined in jsconfig.json
    "components": "#cli/components",
    "utils": "#cli/lib/utils",
    "ui": "#cli/components/ui",
    "lib": "#cli/lib",
    "hooks": "#cli/hooks"
  },
  "iconLibrary": "lucide"
}
```

Create `cli/styles/globals.css`, `cli/lib/utils.mjs`

# Changelog

See [changelog here](https://github.com/afialapis/miolo/blob/main/CHANGELOG.md)
