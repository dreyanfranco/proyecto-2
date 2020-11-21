# Proyecto-2
Isabel Pérez | Dreyan Franco

 ### Inicializar app con:
 ```sh
$ npm install 
$ npm run dev
```

### Tabla de endpoint
| id | method | path | description |
| ------ | ------ | ------ | ------ |
| 1 | get | / | Muestra la info de app con enlace al resto de páginas |
| 2 | get | /plantas | Listado de plantas con enlace a detalles |
| 3 | get | /plantas/detalle/:id | Detalles de la planta |
| 4 | get | /registro | Muestra formulario de registro |
| 5 | post | /registro | Guarda en la BBDD |
| 6 | get | /perfil/:id | Muestra los detalles del perfil y sus plantas añadidas |
| 7 | get | /iniciar-sesion | Muestra el formulario de inicio de sesión  |
| 8 | post | /iniciar-sesion | Consulta la BBDD y te redirige a tu perfil |
| 9 | get | /cerrar-sesion | Cierra sesión y te redirige a la Home |
| 10 | get | /tienda | Muestra listado de tiendas y google maps |
| 11 | get | /editar-planta?id=xxx | Muestra el formulario de edición de planta (solo ADMIN) |
| 12 | post | /editar-planta?id=xxx | Guarda en la BBDD los cambios |
| 13 | get | /eliminar-planta?id=xxx | Elimina de la BBDD la planta |
| 14 | get | /editar-tienda?id=xxx | Muestra el formulario de edición de tienda (solo ADMIN) |
| 15 | post | /editar-tienda?id=xxx | Guarda en la BBDD los cambios |
| 16 | get | /eliminar-tienda?id=xxx | Elimina de la BBDD la tienda |
