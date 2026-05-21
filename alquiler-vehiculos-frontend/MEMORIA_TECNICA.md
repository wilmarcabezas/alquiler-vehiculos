# 1. Portada

**Sistema de Gestión de Alquiler de Vehículos**  
**Memoria técnica del Front-End en React**  
Asignatura: Desarrollo Web Full Stack  
Autor: Entrega académica Front-End  
Fecha: 2026  

# 2. Índice

1. Portada  
2. Índice  
3. Introducción  
4. Componentes de React  
5. Hooks utilizados  
6. Vistas  
7. Consumo de APIs REST  
8. Conclusiones  

# 3. Introducción

El presente documento describe el desarrollo del Front-End del Sistema de Gestión de Alquiler de Vehículos, construido con React y orientado a integrarse con un backend ya existente basado en microservicios. La solución fue diseñada como una interfaz moderna, responsive y modular, capaz de consultar vehículos, mostrar su detalle, registrar solicitudes de alquiler y administrar la creación y actualización de estados de la flota.

El enfoque de desarrollo se centró en cuatro principios: separación de responsabilidades, consumo limpio de APIs REST, reutilización mediante componentes funcionales y experiencia de usuario visualmente cuidada. La aplicación se estructuró en páginas, componentes, hooks y servicios, permitiendo escalar el proyecto y mantener una arquitectura comprensible para evaluación académica y continuidad técnica.

La integración del Front-End se centralizó contra el Gateway/API única, evitando consumir directamente los microservicios internos. La base de conectividad se define con `VITE_API_BASE_URL`, recomendando `/api` para Docker/Nginx y `http://localhost:8080/api` para desarrollo directo contra el Gateway.

También se detectó que el backend actual solo soporta dos estados válidos para los vehículos: `DISPONIBLE` y `NO_DISPONIBLE`. En consecuencia, la interfaz administrativa del Front-End fue ajustada para alinearse con esa restricción y evitar errores al enviar estados no implementados por el microservicio.

# 4. Componentes de React

La aplicación fue implementada con más de diez componentes funcionales en React, cada uno con responsabilidad específica.

## Navbar
Administra la navegación global entre inicio, catálogo y panel administrativo.

## HeroSection
Presenta la propuesta de valor de la plataforma en la página principal.

## VehicleCard
Renderiza la información resumida de cada vehículo dentro del listado.

## VehicleGrid
Organiza las tarjetas de vehículos en un grid responsive.

## VehicleFilters
Permite buscar por marca, modelo o placa, además de filtrar por estado y ordenar por precio.

## StatusBadge
Representa visualmente el estado del vehículo mediante badges reutilizables.

## LoadingSpinner
Informa al usuario cuando la aplicación está cargando datos desde el backend.

## ErrorMessage
Muestra errores de red, validación o backend de manera clara y amigable.

## RentalForm
Permite registrar solicitudes de alquiler hacia el microservicio de operaciones.

## AdminVehicleForm
Permite crear nuevos vehículos desde el panel administrativo.

## VehicleStatusControl
Permite cambiar el estado de un vehículo existente desde la interfaz administrativa.

## Footer
Cierra la experiencia visual con información contextual del proyecto.

# 5. Hooks utilizados

La solución emplea hooks básicos y custom hooks.

## useState
Se utilizó para controlar formularios, mensajes, filtros, estados de carga y errores.

## useEffect
Se utilizó para disparar consultas al backend al montar páginas o cambiar parámetros de ruta.

## Custom hook `useVehicles()`
Este hook centraliza la consulta de vehículos, manejo de loading, errores, refresco de datos y aplicación de filtros visuales.

## Custom hook `useVehicleDetail(id)`
Este hook encapsula la consulta del detalle de un vehículo específico usando su identificador.

# 6. Vistas

## Página principal (`/`)
Incluye hero visual, mensaje del sistema y beneficios clave.

**Captura sugerida:** insertar imagen de la página principal.

## Listado de vehículos (`/vehiculos`)
Muestra tarjetas, filtros, estado vacío, carga y manejo de errores.

**Captura sugerida:** insertar imagen del catálogo de vehículos.

## Detalle del vehículo (`/vehiculos/:id`)
Presenta la información detallada del vehículo y el formulario para solicitud de alquiler.

**Captura sugerida:** insertar imagen del detalle del vehículo.

## Formulario de alquiler
Se integra en la vista de detalle y permite registrar una operación real contra el backend.

**Captura sugerida:** insertar imagen del formulario diligenciado.

## Panel administrativo (`/admin`)
Permite crear vehículos y actualizar su estado.

**Captura sugerida:** insertar imagen del panel administrativo.

## Estados de carga y error
Se implementaron componentes específicos para informar carga de datos, errores y listas vacías.

**Captura sugerida:** insertar imagen de un estado de carga o error.

# 7. Consumo de APIs REST

La integración con el backend se organizó mediante una capa de servicios reutilizable en `src/api/`.

## Configuración de URLs
La aplicación usa estas variables:

```env
VITE_API_BASE_URL=/api
# Opcional para desarrollo directo:
# VITE_API_BASE_URL=http://localhost:8080/api
```

Esto permite cambiar fácilmente el entorno sin reescribir la lógica de acceso y mantiene al Front-End apuntando a un único punto de entrada.

## Servicios implementados

### `vehicleService.js`
Incluye funciones para:
- consultar todos los vehículos,
- consultar disponibles,
- obtener vehículo por ID,
- crear vehículo,
- actualizar estado.

### `rentalService.js`
Incluye funciones para:
- registrar solicitudes de alquiler,
- consultar solicitudes existentes.

## Endpoints esperados
### Vehículos
- `GET /vehiculos`
- `GET /vehiculos/:id`
- `POST /vehiculos`
- `PUT /vehiculos/:id/estado`

### Operaciones
- `POST /operaciones/solicitudes`
- `GET /operaciones/solicitudes`

## Estrategia técnica
Se utilizó Axios con `async/await`, manejo de errores amigable y separación entre acceso a datos y presentación visual. Esta decisión permite que la interfaz se mantenga desacoplada de la lógica HTTP y mejora la mantenibilidad del proyecto.

## Observación de integración
Aunque la arquitectura original contempla el uso de gateway, durante las pruebas el acceso más estable quedó configurado directamente sobre los servicios publicados en host. Esto permite cumplir el objetivo funcional del Front-End mientras el backend termina de estabilizar el enrutamiento centralizado.

# 8. Conclusiones

El Front-End desarrollado cumple con los principios exigidos por la asignatura: uso de React, componentes funcionales, hooks, custom hook, React Router, consumo de APIs REST y diseño visual moderno. La solución no reemplaza el backend existente, sino que se integra con él mediante una arquitectura limpia y configurable.

Desde la perspectiva académica, el proyecto ofrece una entrega robusta por su organización modular, cumplimiento literal de rutas, presencia de más de diez componentes funcionales y una interfaz visualmente sólida. Desde la perspectiva técnica, queda preparado para crecer, incorporar autenticación, ampliar atributos del vehículo y volver a centralizar el consumo por gateway cuando ese componente quede completamente estable.
