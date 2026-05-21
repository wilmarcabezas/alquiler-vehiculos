# Prompt completo para cumplir literalmente el requerimiento del Front-End

## Frase recomendada para iniciar el prompt

```markdown
Antes de generar el código, analiza cada requisito y construye una matriz de cumplimiento. Después genera la solución completa. Al final, vuelve a validar requisito por requisito que todo se haya cumplido literalmente.
```

---

## Prompt completo

```markdown
Antes de generar el código, analiza cada requisito y construye una matriz de cumplimiento. Después genera la solución completa. Al final, vuelve a validar requisito por requisito que todo se haya cumplido literalmente.

Actúa como un desarrollador Front-End senior, diseñador UI/UX y documentador técnico académico. Necesito que construyas una aplicación Front-End completa en React para un “Sistema de Gestión de Alquiler de Vehículos”, cumpliendo literalmente todos los requisitos del documento académico de la asignatura Desarrollo Web Full Stack.

IMPORTANTE:
El Back-End YA EXISTE. No debes construir backend, ni simular lógica principal del backend. Debes crear únicamente el Front-End y conectarlo mediante APIs REST usando fetch o Axios. Si no conoces las URLs exactas del backend, define una capa de servicios configurable mediante una constante `API_BASE_URL` o archivo `.env`, y deja claramente documentados los endpoints esperados.

OBJETIVO GENERAL:
Crear una aplicación React moderna, modular, visualmente atractiva, responsive y funcional para gestionar alquiler de vehículos, integrándose con un backend existente mediante APIs REST.

REQUISITOS OBLIGATORIOS QUE DEBES CUMPLIR:

1. TECNOLOGÍA PRINCIPAL

Construye el Front-End usando React.

La aplicación debe usar:

- React.
- JSX.
- Componentes funcionales.
- React Router.
- Hooks básicos: `useState` y `useEffect`.
- Al menos un custom hook real y funcional.
- CSS moderno, limpio y estético.
- Consumo de APIs REST usando Axios o fetch.

No construyas una aplicación básica o mediocre. El diseño debe ser uno de los puntos más fuertes del proyecto.

2. ARQUITECTURA DEL PROYECTO

Crea una estructura profesional de carpetas como mínimo con:

```txt
src/
  api/
    vehicleService.js
    rentalService.js
  components/
    Navbar.jsx
    HeroSection.jsx
    VehicleCard.jsx
    VehicleGrid.jsx
    VehicleFilters.jsx
    StatusBadge.jsx
    LoadingSpinner.jsx
    ErrorMessage.jsx
    RentalForm.jsx
    AdminVehicleForm.jsx
    VehicleStatusControl.jsx
    Footer.jsx
  hooks/
    useVehicles.js
    useVehicleDetail.js
  pages/
    HomePage.jsx
    VehiclesPage.jsx
    VehicleDetailPage.jsx
    AdminPage.jsx
    NotFoundPage.jsx
  routes/
    AppRouter.jsx
  styles/
    global.css
    layout.css
    components.css
    pages.css
  App.jsx
  main.jsx
```

Puedes mejorar esta estructura, pero no debes reducir el alcance.

3. COMPONENTES FUNCIONALES

La aplicación debe tener más de 10 componentes funcionales. Como mínimo implementa estos 12:

1. `Navbar`
2. `HeroSection`
3. `VehicleCard`
4. `VehicleGrid`
5. `VehicleFilters`
6. `StatusBadge`
7. `LoadingSpinner`
8. `ErrorMessage`
9. `RentalForm`
10. `AdminVehicleForm`
11. `VehicleStatusControl`
12. `Footer`

Cada componente debe tener una responsabilidad clara y estar escrito como componente funcional de React.

Debes explicar brevemente en comentarios o documentación qué función cumple cada componente.

4. RUTAS CON REACT ROUTER

Implementa React Router con mínimo 4 rutas obligatorias:

- `/`  
  Página principal con vista general del sistema.

- `/vehiculos`  
  Listado de vehículos disponibles para alquiler.

- `/vehiculos/:id`  
  Detalle completo de un vehículo específico consultado por ID.

- `/admin`  
  Panel administrativo para registrar vehículos nuevos o actualizar su estado.

También agrega:

- `*`  
  Página 404 personalizada y visualmente cuidada.

5. PÁGINA PRINCIPAL

La página principal debe ser atractiva, moderna y creativa.

Debe incluir:

- Un hero visual con título fuerte.
- Mensaje claro sobre alquiler de vehículos.
- Botón principal hacia `/vehiculos`.
- Sección de beneficios:
  - Alquiler rápido.
  - Vehículos disponibles en tiempo real.
  - Gestión segura.
  - Administración centralizada.
- Diseño moderno tipo plataforma tecnológica, no diseño escolar básico.

6. LISTADO DE VEHÍCULOS

La ruta `/vehiculos` debe:

- Consumir el microservicio de vehículos.
- Obtener la lista de vehículos disponibles.
- Mostrar tarjetas visuales de vehículos.
- Incluir nombre, marca, modelo, placa si existe, precio, estado e imagen si está disponible.
- Mostrar un badge visual del estado.
- Permitir entrar al detalle del vehículo.
- Manejar estados de:
  - Cargando.
  - Error.
  - Lista vacía.
  - Datos cargados correctamente.

Incluye filtros visuales como:

- Buscar por marca o modelo.
- Filtrar por estado.
- Ordenar por precio si el dato existe.

7. DETALLE DEL VEHÍCULO

La ruta `/vehiculos/:id` debe:

- Consultar un vehículo específico por su ID usando el backend.
- Mostrar información detallada del vehículo.
- Mostrar imagen o placeholder visual.
- Mostrar características:
  - Marca.
  - Modelo.
  - Año.
  - Estado.
  - Precio.
  - Tipo.
  - Descripción.
- Incluir formulario para registrar una solicitud de alquiler.
- Al enviar la solicitud de alquiler, debe consumir el microservicio de operaciones.

8. SOLICITUD DE ALQUILER

Implementa un componente `RentalForm`.

Este formulario debe:

- Capturar datos básicos del cliente:
  - Nombre.
  - Documento.
  - Correo.
  - Teléfono.
  - Fecha de inicio.
  - Fecha de devolución.
- Validar campos obligatorios.
- Enviar la solicitud al microservicio de operaciones.
- Mostrar mensajes claros de éxito o error.
- Después de registrar la operación, actualizar el estado del vehículo si corresponde.

9. PANEL ADMINISTRATIVO

La ruta `/admin` debe permitir:

- Registrar un nuevo vehículo.
- Actualizar el estado de un vehículo existente.
- Consumir APIs REST del backend.
- Mostrar formularios limpios y bien diseñados.
- Manejar errores de validación.
- Mostrar mensajes visuales de éxito.

Debe incluir mínimo:

- Formulario de creación de vehículo.
- Selector/listado de vehículos.
- Control para cambiar estado:
  - Disponible.
  - Alquilado.
  - Mantenimiento.
  - Inactivo.

10. INTEGRACIÓN CON BACKEND

Debes crear una capa de servicios limpia y reutilizable.

Ejemplo esperado:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
```

Si decides no usar Vite, usa una alternativa equivalente.

Crea servicios como:

```js
getAvailableVehicles()
getVehicleById(id)
createRentalRequest(payload)
updateVehicleStatus(id, status)
createVehicle(payload)
```

Endpoints sugeridos, ajustables según backend real:

```txt
GET    /vehicles
GET    /vehicles/:id
POST   /operations/rentals
PATCH  /vehicles/:id/status
POST   /vehicles
```

Debes dejar el código preparado para cambiar fácilmente las URLs reales del backend.

El consumo de APIs debe tener:

- Manejo de errores.
- Mensajes amigables para el usuario.
- Separación entre UI y lógica de acceso a datos.
- Uso de `async/await`.
- Validación de respuestas.

11. HOOKS

Debes usar obligatoriamente:

- `useState`
- `useEffect`

Además, crea al menos un custom hook real, por ejemplo:

```js
useVehicles()
```

Este hook debe encargarse de:

- Consultar vehículos.
- Manejar loading.
- Manejar errores.
- Refrescar la lista.
- Devolver datos listos para la UI.

También puedes crear:

```js
useVehicleDetail(id)
```

para consultar el detalle de un vehículo.

12. CSS Y DISEÑO

El diseño es fundamental. No quiero una interfaz básica.

Usa CSS moderno y bien estructurado.

Debe incluir:

- Variables CSS en `:root`.
- Diseño responsive.
- Layout con Flexbox y CSS Grid.
- Tarjetas modernas.
- Botones con estados hover/focus.
- Badges de estado.
- Formularios visualmente cuidados.
- Espaciado profesional.
- Sombras suaves.
- Bordes redondeados.
- Paleta visual elegante.
- Diseño mobile-first.
- Transiciones suaves.
- Buen contraste.
- Accesibilidad básica.

Estilo visual deseado:

- Moderno.
- Limpio.
- Profesional.
- Inspirado en plataformas SaaS.
- Con apariencia tecnológica.
- Uso de colores sobrios: azul profundo, gris claro, blanco, acentos verdes o dorados.
- Debe parecer una aplicación real de gestión de alquiler de vehículos, no una maqueta simple.

13. EXPERIENCIA DE USUARIO

Incluye detalles creativos:

- Estado vacío con ilustración o ícono.
- Skeleton/loading o spinner elegante.
- Mensajes de error útiles.
- Confirmaciones visuales.
- Navegación clara.
- Botones de acción visibles.
- Formularios ordenados por secciones.
- Detalles visuales para diferenciar vehículos disponibles, alquilados o en mantenimiento.

14. DOCUMENTACIÓN INTERNA DEL CÓDIGO

Incluye comentarios útiles, sin exagerar.

Documenta:

- La capa de servicios.
- Los custom hooks.
- Componentes principales.
- Estructura de rutas.
- Cómo configurar la URL del backend.

15. MEMORIA TÉCNICA EN PDF

Además del código, debes crear el contenido completo para una memoria técnica en formato académico, con máximo 20 páginas.

La memoria debe tener exactamente estos apartados y en este orden:

1. Portada.
2. Índice.
3. Introducción.
4. Componentes de React.
5. Hooks utilizados.
6. Vistas.
7. Consumo de APIs REST.
8. Conclusiones.

La memoria debe explicar:

- Funcionalidad del sistema de alquiler de vehículos.
- Enfoque utilizado para el desarrollo del Front-End.
- Componentes desarrollados y su funcionalidad.
- Hooks usados.
- Custom hook creado.
- Vistas implementadas.
- Capturas sugeridas de cada vista.
- Integración con el backend.
- Conclusiones del desarrollo.

En la sección de vistas, deja espacios o referencias para insertar capturas de pantalla de:

- Página principal.
- Listado de vehículos.
- Detalle del vehículo.
- Formulario de alquiler.
- Panel administrativo.
- Estado de error o carga.

16. RÚBRICA: OPTIMIZAR PARA NOTA EXCELENTE

Construye la solución pensando en obtener calificación excelente.

Asegúrate de cumplir con:

- Documento completo, ordenado y listo para entregar.
- Memoria clara, estructurada y con todas las secciones.
- Más de 10 componentes funcionales.
- Uso correcto de React.
- Uso de hooks.
- Custom hook funcional.
- Diseño atractivo con CSS bien estructurado.
- Integración fluida con backend.
- Manejo adecuado de errores.
- Funcionalidad completa en las rutas definidas.

17. ENTREGA ESPERADA

Debes entregar:

A. Código completo del proyecto Front-End.

B. Estructura de carpetas.

C. Archivos React completos.

D. Archivos CSS completos.

E. Servicios de conexión al backend.

F. Custom hooks.

G. Rutas configuradas.

H. Explicación de cómo ejecutar el proyecto.

I. Archivo `.env.example` con la variable del backend.

J. Contenido completo de la memoria técnica.

K. Lista de verificación final indicando cómo se cumple cada requisito del documento.

18. REGLAS IMPORTANTES

No omitas código.

No entregues solo fragmentos.

No hagas una explicación genérica.

No ignores la integración con backend.

No construyas backend.

No uses datos quemados como solución final, salvo como fallback temporal claramente marcado.

No reduzcas el número de componentes.

No olvides el custom hook.

No olvides React Router.

No olvides la memoria técnica.

No olvides explicar el consumo de APIs REST.

No olvides que el diseño es parte central de la evaluación.

19. FORMATO DE RESPUESTA

Entrega la respuesta organizada así:

1. Resumen de la solución.
2. Estructura de carpetas.
3. Instalación y ejecución.
4. Variables de entorno.
5. Código completo archivo por archivo.
6. Explicación de componentes.
7. Explicación de hooks.
8. Explicación de integración con APIs REST.
9. Contenido de la memoria técnica.
10. Checklist de cumplimiento literal del requerimiento.

20. NIVEL DE CALIDAD

Quiero una solución profesional, creativa y académicamente sólida.

El resultado debe verse como una aplicación real de alquiler de vehículos, con una interfaz moderna y cuidada, y debe estar preparado para conectarse al backend existente sin rehacer la arquitectura.
```

---

## Checklist de cumplimiento literal del requerimiento

| Requisito del documento | Cómo lo cubre el prompt |
|---|---|
| Front-End en React | Exige React como tecnología principal. |
| Componentes funcionales | Solicita más de 10 componentes funcionales y lista 12 específicos. |
| JSX | Indica explícitamente el uso de JSX. |
| Hooks básicos | Exige `useState` y `useEffect`. |
| Custom hook | Solicita `useVehicles()` y propone `useVehicleDetail(id)`. |
| React Router | Define rutas `/`, `/vehiculos`, `/vehiculos/:id`, `/admin` y `*`. |
| Listado de vehículos | Solicita consumo del microservicio de vehículos y visualización de tarjetas. |
| Detalle por ID | Exige consulta individual por ID. |
| Solicitud de alquiler | Incluye formulario y consumo del microservicio de operaciones. |
| Actualizar estado del vehículo | Incluye control administrativo y actualización posterior a operación. |
| CSS moderno | Exige variables CSS, responsive, grid, flexbox, badges, formularios y diseño SaaS. |
| Memoria técnica PDF | Define los 8 apartados obligatorios en el orden exacto. |
| Rúbrica excelente | Optimiza explícitamente para obtener nivel excelente. |
| Backend existente | Aclara que no se debe crear backend y que se debe integrar con APIs REST. |
```

