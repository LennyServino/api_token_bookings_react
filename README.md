# Proyecto Alojamientos

Este proyecto consiste en una aplicación web desarrollada en **React** que permite gestionar alojamientos y reservaciones. La aplicación consume la **Bookings API** para realizar operaciones CRUD (crear, leer, actualizar y eliminar) relacionadas con alojamientos y reservaciones.

## Enlaces

- **API Documentación**: [Bookings API](https://apibookingsaccomodations-production.up.railway.app/api/documentation)
- **Diseño Figma**: [Figma - Proyecto Alojamientos](https://www.figma.com/design/MGiNeCbEhEVvRI1iCPkKcV/Proyecto-Alojamientos?node-id=0-1&t=8fwZBaig6DDEBds5-1)

## Funcionalidades

La aplicación cuenta con las siguientes características:

1. **Inicio de sesión**: Permite a los usuarios autenticarse en la aplicación.
2. **Lista de Alojamientos**: Muestra una lista de todos los alojamientos disponibles.
3. **Guardar Alojamiento**: Permite añadir nuevos alojamientos.
4. **Actualizar Alojamiento**: Permite modificar la información de un alojamiento existente.
5. **Lista de Reservaciones**: Muestra todas las reservaciones realizadas.
6. **Guardar Reservaciones**: Permite añadir nuevas reservaciones.
7. **Cancelar Reservación**: Permite cancelar una reservación existente.
8. **Calendario de Reservaciones por Alojamiento**: Muestra un calendario con las reservaciones realizadas para cada alojamiento.

## Tecnologías Utilizadas

- **React**: Framework principal para la construcción de la interfaz de usuario.
- **React Router**: Manejo de rutas de navegación.
- **Axios**: Para realizar solicitudes HTTP a la API de Bookings.
- **React Big Calendar**: Para el manejo y diseño de reservaciones en el calendario.

## Uso de la Aplicación

1. **Inicio de Sesión**: Los usuarios deben iniciar sesión para acceder a las funcionalidades de la aplicación.
2. **Gestión de Alojamientos**: Visualiza, agrega y actualiza información sobre los alojamientos.
3. **Gestión de Reservaciones**: Agrega nuevas reservaciones, visualiza las existentes y cancélalas si es necesario.
4. **Calendario**: Consulta el calendario para ver las reservaciones.

## Rutas del Proyecto
**/login**: Inicia sesión para acceder a las funcionalidades de la aplicación.<br/>
**/alojamientos**: Visualiza, agrega y actualiza información sobre los alojamientos.<br/>
**/calendario**: Consulta el calendario para ver y crear las reservaciones<br/>

## Dependencias
"@types/react-big-calendar": "^1.15.0",<br/>
"api_token_bookings": "file:",<br/>
"axios": "^1.7.7",<br/>
"react": "^18.3.1",<br/>
"react-big-calendar": "^1.15.0",<br/>
"react-dom": "^18.3.1",<br/>
"react-hook-form": "^7.53.1",<br/>
"react-modal": "^3.16.1",<br/>
"react-router-dom": "^6.27.0"<br/>

## Autores
Melvin Alexander González<br/>
William Alexander Henríquez Zelaya<br/>
Edwin Morataya<br/>
Lenny Servino<br/>
Iván Ernesto Calderón<br/>
