handle login errors









# Auth

 · OJO: /login no refresca pagina. Hacer un redirect por defecto?

 => Ir con rutas /login!!

# SSR (esto ya es client side)

	· AT WHAT MOMENT WINDOW.STATE CAN BE EMPTY?
	  (necesitariamos el primer useEffect solo al F5)

# WebPack
  1- simplificar config
	2- para dev el mismo modo de compiler(callback)
  3- acabar de ver webpack5?

## miolo + bundler?
	pasariamos un tercer argumento
	  miolo (config, render, bundler)
	
	koa-webpack:
			https://github.com/shellscape/koa-webpack
			https://github.com/webpack/webpack-dev-middleware#server-side-rendering

	¿Conjugamos de alguna manera servevent + webbpack?
	¿O dejamos que el bundler sea cosa del caller?

# Going PUB

## Narrativa
  
	==> OJO, servenet no es solo server! es server+mailer+logger+redis! Ver narrativa!

  ? publicar cada init() o una macro funcion que inicialice todos los objetos en base a una sola config?
	? quiza mejor mantener ambos, no?
	? o quiza mejor extraer de miolo:
	  - emailer
		- logger (Logilia https://en.wikipedia.org/wiki/Ulipristal_acetate, Dologen)
		- cacher


## cli/request

  ==> ya que hace alguna cosa especifica para el miolo,
	    publicarlo dentro de 'miolo'
	 