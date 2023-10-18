//  1) DONE
//  ESTOS CALLBACKS LOGIN/LOGOUT PUEDEN ESTAR A NIVEL DE AppContext
//  En el caso de Bonages no valdria porque hay un ssr_data.user_info,
//    pero esa user_info parece duplicada, ya que deberia estar en el Context.user, no?
//    Si es asi podemos eliminar duplicidad y proceder con estos callbacks
//  
//  2)
//  Tb a nivel de AppContext se han de poder poner unos
//    getSsrData()
//
//  Basta uno, con param loader opcional
//
//
//  1) y 2) igual mejor en miolo_client que en AppContext,
//    asi esta en miolo/cli y no en milo/cli-react solo
//    Pero necesitamos cachear el context de alguna manera en vanilla JS,
//    o directamente sobre windows.CONTEXT
//    
//  3)
//  DONE: Auth type 'passport': quiza llamar mejor 'credentials' o algo asi, ya que no hay necesidad de exponer nada de passport
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



hostname cli vs server?
añadir chpwsd endpoint

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



# Render

## html
 
- si no string, que sea un {} con los campos a sustituir en los <meta/> del HTML por defecto
- aun con esto, para casos como Bonages, nos faltaria la linea <rel/> del CSS y <script> (dev mode al menos)

## SSR

- quizá los useSsrData..() como atributo de context?



# Router

## auth.action

Current: 'redirect', 'error'
Add these? 'empty' / 'none'



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
 
