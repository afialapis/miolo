# router

## simplificar options auth-related

 {
   schema,
   bodyField,
   auth: {
    require: false,     // true / false / 'read-only'
    action: 'redirect', // 'error'
    redirect_url: '/',
    error_code: 401

   crud: {
    '/prefix/one': {
      auth: {...},
      routes: '*',
      routes: [{
        name,
        schema,
        url,
        options: {
          mode: r/rw/ru,
          useUserFields: [],
          auth: {...},
        }
      }]      
    }
  },

   queries: {
    '/prefix/one': {
      auth: {...},
      routes: [{
        url,
        method, // GET - POST
        callback: (ctx) => {},
        options: {
          auth: {...},
        }
      }]      
    }
  },

 }

## auth.action

Current: 'redirect', 'error'
Add these? 'empty' / 'none'

# SSR

# render failback

config.render {
	html,
	ssr: {loader, renderer}
	json: empty/404/redirect
}

que el init_ssr() se haga siempre, pasar loader/renderer directamente


· render middleware: dejar claro que template strings ha de tener el index.html: {context} y {children}
· quizá los useSsrData..() como atributo de context?


# demo

- usar Fetcher en demo-app?

# `xeira.run`

When available, apply here.

If possible, export also server commands for running it.





# miolo + client bundle?
	
  Con `xeira` se puede facilitar el tema. Por ejemplo, pasando un tercer parámetro:

```js
	miolo (config, render, client)
```
  
Donde `client` es:

```js
{
	'entry': '././index.js',
	'html': '<html>....</html>` // aumentaríamos a {context}, {children}, {bundle} y {styles}
}
```

Pero habría que tener en cuenta también el `dev time`. Habría que añadir un `watch`
tal como hace `xeira demo`. Y probablemente algún `HMR`.
 
