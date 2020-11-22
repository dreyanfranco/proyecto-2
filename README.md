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
| 2 | get | /registro | Muestra formulario de registro |
| 3 | post | /registro | Guarda en la BBDD |
| 4 | get | /perfil/:id | Muestra los detalles del perfil y sus plantas añadidas |
| 5 | get | /iniciar-sesion | Muestra el formulario de inicio de sesión  |
| 6 | post | /iniciar-sesion | Consulta la BBDD y te redirige a tu perfil |
| 7 | get | /cerrar-sesion | Cierra sesión y te redirige a la Home |
| 8 | get | /editar-usuario?id=xxx | Muestra el formulario de edición de usuario (solo ADMIN) |
| 9 | post | /editar-usuario?id=xxx | Guarda en la BBDD los cambios en el usuario |
| 10 | get | /eliminar-usuario?id=xxx | Elimina de la BBDD el usuario |
| 11 | get | /plantas | Listado de plantas con enlace a detalles |
| 12 | get | /plantas/detalle/:id | Detalles de la planta |
| 13 | get | /crear-planta | Muestra el formulario para añadir (solo ADMIN) |
| 14 | post | /crear-planta | Guarda en la BBDD la nueva planta |
| 15 | get | /editar-planta?id=xxx | Muestra el formulario de edición de planta (solo ADMIN) |
| 16 | post | /editar-planta?id=xxx | Guarda en la BBDD los cambios |
| 17 | get | /eliminar-planta?id=xxx | Elimina de la BBDD la planta |
| 18 | get | /tienda | Muestra listado de tiendas y google maps |
| 19 | get | /crear-tienda | Muestra el formulario para añadir una nueva tienda (solo ADMIN) |
| 20 | post | /crear-tienda | Guarda en la BBDD la nueva tienda |
| 21 | get | /editar-tienda?id=xxx | Muestra el formulario de edición de tienda (solo ADMIN) |
| 22 | post | /editar-tienda?id=xxx | Guarda en la BBDD los cambios |
| 23 | get | /eliminar-tienda?id=xxx | Elimina de la BBDD la tienda |
