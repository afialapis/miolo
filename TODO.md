# `xeira.run`

When available, apply here.

If possible, export also server commands for running it.

# Demo

Made two server targets:

- Web server (done)
- App server - API/CRUD endpoint


# SSR

· render middleware: dejar claro que template strings ha de tener el index.html: {context} y {children}
· quizá los useSsrData..() como atributo de context?


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
 
