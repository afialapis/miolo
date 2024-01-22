//
//  4)
//  Volver a intentar con que el 'ssr.renderer' no necesite de AppServer. 
//  Daba problemas con el Context. Pero quiza se pueda resolver.
//
//  0000)
//  RECORDAR OBJETIVO FINAL:
//    la config de auth no va a nivel global del Server, sino
//    en cada grupo de routes (o ambos, global y routes)
//

https://stackoverflow.com/a/60985636


hostname cli vs server?
añadir chpwsd endpoint

# Logger

Si se especifica config.db.options.log, que ese level afecte solo a calustra.
Hay que rear otra instancia del logger en middleware/context, al inicializar getConnection().
Aunque no se si dos instancias romperan algo aqui.



# Auth

## Basic auth

### How to route?

Como hacer la primera load con "/".
omitir directamente en auth.basic.paths??
no parece muy bueno tener que pasar toooodas las rutas ahi

## Guest auth

### koa-session?

Wouldn't be enough to use koa-session? Token could be taken from cookie.
And we would get rid of JWT.



# Router

## auth.action

Current: 'redirect', 'error'
Add these? 'empty' / 'none'

# Ratelimit

Use Redis store


# DEV time

## `xeira.run`

When available, apply here.

If possible, export also server commands for running it.


## miolo + client bundle?
	
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
 
