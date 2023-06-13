
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
 
