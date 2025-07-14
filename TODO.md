# demo

==> error en modo prod
==> no pasar opciones en los scripts del pkg.json Y en server/config.
    simplificar eso.















1 - cli y clireact en otro pkg
2 - ver si asi persisten problemas de doble react en demo con dependencia local


En /bin, los wrappers miolo-prod.mjs y miolo-dev.mjs
podrian ser innecesarios. Que el entry sea el fichero de options y ya.







# ipsum

Añadir un directorio custom que se pueda actualizar sin upgradear miolo

Añadir tambien blacklist segun target:
/__phpmyadmin/index.php
/_phpmyadmin/index.php
/_phpMyAdmin/index.php
/1phpmyadmin/index.php
/admin/db/index.php
/admin/index.php
/admin/pma/index.php
/admin/sqladmin/index.php
/admin/sysadmin/index.php
/administrator/admin/index.php
/administrator/db/index.php
/administrator/phpmyadmin/index.php
/administrator/phpMyAdmin/index.php
/administrator/web/index.php
/database/index.php
/db/db-admin/index.php
/db/dbadmin/index.php
/db/index.php
/db/myadmin/index.php
/db/phpMyAdmin-3/index.php
/db/phpMyAdmin-4/index.php
/db/phpMyAdmin-5/index.php
/db/phpmyadmin/index.php
/db/phpmyadmin3/index.php
/db/webadmin/index.php
/db/webdb/index.php
/db/websql/index.php
/dbadmin/index.php
/mysql/admin/index.php
/mysql/db/index.php
/mysql/dbadmin/index.php
/mysql/index.php
/mysql/pma/index.php
/mysql/web/index.php
/mysqladmin/index.php
/mysqlmanager/index.php
/php-my-admin/index.php
/phpmy/index.php
/phpMyAdmin-3/index.php
/phpMyAdmin-4.9.7/index.php
/phpMyAdmin-4/index.php
/phpMyAdmin-5.1.0/index.php
/phpMyAdmin-5.1.2/index.php
/phpMyAdmin-5.1.3/index.php
/phpMyAdmin-5.2.0-all-languages/index.php
/phpMyAdmin-5.2.0/index.php
/phpMyAdmin-5.2.1-all-languages/index.php
/phpMyAdmin-5.2.1-english/index.php
/phpMyAdmin-5.2.1/index.php
/phpMyAdmin-5.2/index.php
/phpMyAdmin-latest-all-languages/index.php
/phpMyAdmin-latest-english/index.php
/phpMyAdmin-latest/index.php
/phpmyadmin/index.php
/phpMyadmin/index.php
/phpmyadmin1/index.php
/phpMyAdmin1/index.php
/phpmyadmin2/index.php
/phpMyAdmin2/index.php
/phpMyAdmin2/index.php
/phpmyadmin2018/index.php
/phpmyadmin2018/index.php
/phpmyadmin2018/index.php
/phpmyadmin2018/index.php
/phpmyadmin2020/index.php
/phpmyadmin2020/index.php
/phpmyadmin2020/index.php
/phpmyadmin2020/index.php
/phpmyadmin2021/index.php
/phpmyadmin2021/index.php
/phpmyadmin2021/index.php
/phpmyadmin2021/index.php
/phpmyadmin2022/index.php
/phpmyadmin2022/index.php
/phpmyadmin2022/index.php
/phpmyadmin2022/index.php
/phpMyAdmin3/index.php
/phpMyAdmin3/index.php
/phpMyAdmin3/index.php
/phpMyAdmin3/index.php
/phpMyAdmin4/index.php
/phpMyAdmin4/index.php
/phpMyAdmin4/index.php
/phpMyAdmin4/index.php
/phpMyAdmin5.2/index.php
/phpMyAdmin5.2/index.php
/phpMyAdmin5.2/index.php
/phpMyAdmin5.2/index.php
/phpmyadmin5/index.php
/phpmyadmin5/index.php
/phpmyadmin5/index.php
/phpmyadmin5/index.php
/phpMyAdmin5/index.php
/phpMyAdmin5/index.php
/phpMyAdmin5/index.php
/phpMyAdmin5/index.php
/phpMyAdmin6.0/index.php
/phpMyAdmin6.0/index.php
/phpMyAdmin6.0/index.php
/phpMyAdmin6.0/index.php
/phpmyadmin6/index.php
/phpmyadmin6/index.php
/phpmyadmin6/index.php
/phpmyadmin6/index.php
/phpMyAdmin6/index.php
/phpMyAdmin6/index.php
/phpMyAdmin6/index.php
/phpMyAdmin6/index.php
/phppma/index.php
/phppma/index.php
/phppma/index.php
/phppma/index.php
/pma/index.php
/program/index.php
/program/index.php
/program/index.php
/program/index.php
/shopdb/index.php
/shopdb/index.php
/shopdb/index.php
/shopdb/index.php
/sql/myadmin/index.php
/sql/myadmin/index.php
/sql/myadmin/index.php
/sql/myadmin/index.php
/sql/phpmyadmin3/index.php
/sql/phpmyadmin3/index.php
/sql/phpmyadmin3/index.php
/sql/phpmyadmin3/index.php
/sql/phpmyadmin4/index.php
/sql/phpmyadmin4/index.php
/sql/phpmyadmin4/index.php
/sql/phpmyadmin4/index.php
/sql/sql-admin/index.php
/sql/sql-admin/index.php
/sql/sql-admin/index.php
/sql/sql-admin/index.php
/sql/sql/index.php
/sql/sql/index.php
/sql/sql/index.php
/sql/sql/index.php
/sql/sqladmin/index.php
/sql/sqladmin/index.php
/sql/sqladmin/index.php
/sql/sqladmin/index.php
/sql/sqlweb/index.php
/sql/sqlweb/index.php
/sql/sqlweb/index.php
/sql/sqlweb/index.php
/sql/webadmin/index.php
/sql/webadmin/index.php
/sql/webadmin/index.php
/sql/webadmin/index.php
/sql/webdb/index.php
/sql/webdb/index.php
/sql/webdb/index.php
/sql/webdb/index.php
/sqlmanager/index.php
/sqlmanager/index.php
/sqlmanager/index.php
/sqlmanager/index.php
/wp-content/plugins/portable-phpmyadmin/wp-pma-mod/index.php
/wp-content/plugins/portable-phpmyadmin/wp-pma-mod/index.php
/wp-content/plugins/portable-phpmyadmin/wp-pma-mod/index.php
/wp-content/plugins/portable-phpmyadmin/wp-pma-mod/index.php

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
 
