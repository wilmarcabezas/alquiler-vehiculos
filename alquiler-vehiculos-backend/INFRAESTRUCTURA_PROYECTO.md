# Infraestructura del Proyecto: Sistema de Gestión de Alquiler de Vehículos

## 1. Introducción

El presente documento describe la infraestructura técnica del proyecto **Sistema de Gestión de Alquiler de Vehículos**, desarrollado bajo una arquitectura de microservicios. Su propósito es explicar de manera estructurada cómo se compone el entorno backend, cómo se comunican sus componentes, cómo se despliega localmente y cómo se realizaron las pruebas funcionales y de carga mediante **JMeter**, todo ello en coherencia con los requerimientos iniciales de la actividad.

De acuerdo con el planteamiento del proyecto, la solución debía implementar exclusivamente el backend de una aplicación web, exponer funcionalidades por medio de APIs, gestionar persistencia estructurada, incorporar un servidor de descubrimiento de servicios, un gateway de entrada y contenedores Docker ejecutables localmente. Sobre esa base, la infraestructura construida permite no solo cumplir los requisitos funcionales, sino también validar el comportamiento del sistema mediante pruebas automatizadas.

---

## 2. Enfoque general de la infraestructura

La infraestructura del proyecto se diseñó bajo un modelo distribuido compuesto por servicios independientes, cada uno con una responsabilidad específica. Todos los componentes del backend se despliegan de forma contenerizada utilizando **Docker Compose**, lo cual permite reproducir el sistema en un entorno local de manera controlada, consistente y cercana a un escenario real de integración.

La solución está formada por los siguientes elementos principales:

- **Microservicio de vehículos**
- **Microservicio de operaciones**
- **Servidor Eureka** para descubrimiento de servicios
- **API Gateway** como punto único de entrada
- **Base de datos PostgreSQL** para persistencia relacional
- **JMeter** como componente de validación técnica y pruebas automatizadas

---

## 3. Componentes de la infraestructura

## 3.1 Microservicio `vehiculos-service`

Este microservicio es responsable de administrar la información de los vehículos disponibles para alquiler. Dentro de la infraestructura, cumple el rol de servicio de catálogo e inventario.

### Responsabilidades técnicas
- Registrar vehículos.
- Consultar vehículos por identificador.
- Actualizar sus datos.
- Eliminar registros.
- Realizar búsquedas por marca, modelo y estado.
- Actualizar el estado de disponibilidad del vehículo.

### Rol en la arquitectura
`vehiculos-service` es un servicio autónomo con su propia lógica de negocio y persistencia. Se registra en Eureka al iniciar y puede ser accedido a través del Gateway o consultado por `operaciones-service`.

### Puerto expuesto
- `8081`

---

## 3.2 Microservicio `operaciones-service`

Este microservicio gestiona las solicitudes de alquiler. Su función principal es coordinar el proceso de alquiler sin acceder directamente a la base de datos del microservicio de vehículos.

### Responsabilidades técnicas
- Registrar solicitudes de alquiler.
- Validar la existencia y disponibilidad del vehículo consultando al microservicio `vehiculos-service`.
- Confirmar solicitudes.
- Cancelar solicitudes.
- Cambiar el estado del vehículo al confirmar o cancelar una operación.

### Rol en la arquitectura
`operaciones-service` representa la capa de proceso de negocio asociada al alquiler. Dentro de la infraestructura, depende de la disponibilidad de `vehiculos-service` para verificar reglas del dominio relacionadas con el estado del vehículo.

### Puerto expuesto
- `8082`

---

## 3.3 Servidor `eureka-server`

El servidor Eureka actúa como registro de servicios. Su propósito es permitir que los microservicios se registren dinámicamente y puedan ser localizados por nombre lógico dentro de la red de la aplicación.

### Funciones principales
- Registrar automáticamente los microservicios al iniciar.
- Permitir el descubrimiento dinámico de servicios.
- Facilitar la comunicación entre componentes sin necesidad de depender de rutas manuales hacia `localhost` para el acceso lógico entre servicios.

### Rol en la arquitectura
Eureka es el núcleo de descubrimiento de la solución. Gracias a este componente, el Gateway puede enrutar peticiones a servicios registrados y el ecosistema mantiene un modelo de infraestructura orientado a microservicios.

### Puerto expuesto
- `8761`

---

## 3.4 `gateway-service`

El Gateway constituye el punto único de entrada al backend. Es el componente que recibe las peticiones del cliente y las redirige al microservicio correspondiente en función de la ruta solicitada.

### Rutas principales configuradas
- `/api/vehiculos/**`
- `/api/operaciones/**`

### Funciones principales
- Centralizar el acceso al backend.
- Encapsular la topología interna de microservicios.
- Dirigir las solicitudes hacia `vehiculos-service` y `operaciones-service`.

### Rol en la arquitectura
El Gateway simplifica el consumo del backend y evita que los clientes interactúen directamente con cada microservicio individual.

### Puerto expuesto
- `8080`

---

## 3.5 Base de datos `PostgreSQL`

La persistencia del sistema se implementó con PostgreSQL, cumpliendo el requerimiento de utilizar una base de datos relacional. Dentro de la infraestructura, PostgreSQL actúa como motor de almacenamiento estructurado para la solución.

### Características del uso en el proyecto
- Motor relacional único desplegado en contenedor.
- Bases separadas para los dominios:
  - `vehiculosdb`
  - `operacionesdb`
- Inicialización mediante script SQL.

### Rol en la arquitectura
Aunque el contenedor de PostgreSQL es único, la persistencia se organiza por contexto funcional, permitiendo separar lógicamente los datos de vehículos y operaciones.

### Puerto expuesto
- `5432`

---

## 3.6 JMeter como infraestructura de pruebas

Además de los componentes exigidos inicialmente en la actividad, se incorporó **Apache JMeter** como herramienta de validación y pruebas del backend. Aunque JMeter no forma parte de los requisitos funcionales obligatorios, sí fortalece la infraestructura técnica al aportar un mecanismo automatizado para comprobar el comportamiento real de los endpoints.

### Funciones de JMeter dentro del proyecto
- Ejecutar pruebas funcionales automatizadas sobre el Gateway.
- Validar respuestas HTTP esperadas.
- Simular tráfico concurrente controlado.
- Medir tiempos de respuesta y tasa de error.
- Generar reportes de resultados en formato `.jtl` y HTML.

### Uso práctico realizado
Se construyeron dos planes de prueba:

1. **Smoke test funcional**
   - consulta de vehículos
   - creación de vehículo
   - creación de solicitud
   - confirmación de solicitud
   - cancelación de solicitud

2. **Prueba de carga básica**
   - 10 usuarios concurrentes
   - 20 iteraciones
   - 200 peticiones totales
   - 0 errores

### Rol en la arquitectura
JMeter se integró como un componente de soporte técnico para validar que la infraestructura no solo despliega correctamente los servicios, sino que además responde adecuadamente bajo ejecución real.

---

## 4. Despliegue con Docker Compose

Toda la infraestructura del proyecto se orquesta mediante **Docker Compose**. Esto permite levantar los contenedores del backend con una única instrucción y garantizar la conectividad entre ellos a través de una red compartida.

### Servicios definidos en `docker-compose.yml`
- `postgres`
- `eureka-server`
- `gateway-service`
- `vehiculos-service`
- `operaciones-service`
- `jmeter` (incorporado como apoyo de pruebas)

### Ventajas del uso de Docker Compose
- Facilita el despliegue local.
- Reduce errores de configuración manual.
- Garantiza consistencia entre ejecuciones.
- Permite validar dependencias y orden de arranque.
- Reproduce una infraestructura modular y portable.

---

## 5. Red y comunicación entre componentes

Todos los contenedores se integran a una red Docker común llamada:

- `alquiler-network`

Esto permite que los servicios se comuniquen internamente por nombre dentro del ecosistema contenerizado.

### Flujo general de comunicación
1. El cliente realiza peticiones al `gateway-service`.
2. El Gateway enruta la solicitud al microservicio correspondiente.
3. `operaciones-service`, cuando necesita validar un alquiler, consulta a `vehiculos-service`.
4. Los microservicios utilizan PostgreSQL para su persistencia.
5. Eureka mantiene el registro de servicios activos.
6. JMeter ejecuta pruebas contra el Gateway para verificar el comportamiento del backend completo.

---

## 6. Infraestructura lógica del sistema

A nivel lógico, la infraestructura puede entenderse mediante la siguiente secuencia:

```text
Cliente externo
   |
   v
Gateway Service (8080)
   |
   |-------------> vehiculos-service (8081)
   |
   |-------------> operaciones-service (8082)
                           |
                           v
                  validación de vehículo
                           |
                           v
                  vehiculos-service (8081)

Eureka Server (8761)
- registra gateway-service
- registra vehiculos-service
- registra operaciones-service

PostgreSQL (5432)
- vehiculosdb
- operacionesdb

JMeter
- ejecuta smoke tests
- ejecuta pruebas de carga
- genera reportes HTML
```

---

## 7. Evidencia de pruebas realizadas

Durante la validación práctica de la infraestructura se ejecutaron pruebas reales sobre el backend desplegado.

### Pruebas funcionales verificadas
- creación de vehículos
- consulta de vehículos
- búsqueda por marca, modelo y estado
- creación de solicitud de alquiler
- confirmación de solicitud
- cancelación de solicitud
- control de errores por duplicidad de placa
- validación de fechas inválidas
- rechazo de alquiler sobre vehículo no disponible

### Resultados relevantes
- flujo principal del sistema validado correctamente
- integración entre microservicios operativa
- Gateway operativo
- respuestas HTTP consistentes
- errores de negocio correctamente controlados

### Resultados de JMeter
#### Smoke test
- 5 muestras ejecutadas
- 0 errores

#### Prueba de carga
- 200 peticiones totales
- 10 usuarios concurrentes
- 0 errores
- tiempo promedio aproximado: 8 ms
- throughput aproximado: 21.7 solicitudes por segundo

---

## 8. Relación con los requerimientos iniciales

La infraestructura implementada responde directamente a los requerimientos planteados en la actividad:

### Requerimiento 1. Backend exclusivo
Se desarrolló únicamente la capa backend del sistema.

### Requerimiento 2. APIs para funcionalidades
Los microservicios exponen APIs REST para gestionar vehículos y solicitudes de alquiler.

### Requerimiento 3. Separación de responsabilidades
La infraestructura separa claramente el dominio de vehículos del dominio de operaciones.

### Requerimiento 4. Persistencia estructurada
Se empleó PostgreSQL como base de datos relacional.

### Requerimiento 5. Despliegue local o contenerizado
Toda la solución se despliega en contenedores Docker mediante Docker Compose.

### Requerimiento 6. Eureka
Se incorporó un servidor Eureka para registro y descubrimiento de servicios.

### Requerimiento 7. Gateway
Se implementó un Gateway como punto único de entrada al backend.

### Requerimiento 8. Contenedores individuales
Cada componente principal del sistema dispone de su propio contenedor.

### Requerimiento 9. Validación del sistema
Aunque no era una exigencia explícita del enunciado, se reforzó la solución con JMeter para verificar el comportamiento funcional y de carga del backend.

---

## 9. Conclusión

La infraestructura del proyecto fue construida de forma coherente con los requerimientos iniciales, utilizando una arquitectura de microservicios contenerizada y apoyada en herramientas estándar del ecosistema backend moderno. La presencia de `vehiculos-service`, `operaciones-service`, `eureka-server`, `gateway-service` y PostgreSQL cubre los elementos esenciales solicitados por la actividad.

Adicionalmente, la incorporación de JMeter permitió fortalecer la validación técnica del sistema, aportando evidencia práctica del correcto funcionamiento del backend tanto en pruebas funcionales como en pruebas básicas de carga. En conjunto, la infraestructura no solo cumple con el enunciado del proyecto, sino que ofrece una base sólida, ordenada y verificable para la entrega académica.
