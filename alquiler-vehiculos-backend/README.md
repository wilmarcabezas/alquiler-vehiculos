# Desarrollo de un Sistema de Gestión de Alquiler de Vehículos

## 1. Objetivo del proyecto
Este proyecto implementa exclusivamente el Backend de un sistema de gestión de alquiler de vehículos mediante una arquitectura de microservicios. La solución permite administrar vehículos disponibles para alquiler y gestionar solicitudes de alquiler sin acoplar directamente las responsabilidades de cada dominio.

## 2. Arquitectura general
La solución está compuesta por cuatro servicios principales y una base de datos PostgreSQL:

- **eureka-server**: registro de servicios.
- **gateway-service**: punto único de entrada para clientes.
- **vehiculos-service**: gestión de vehículos.
- **operaciones-service**: gestión de solicitudes de alquiler.
- **PostgreSQL**: persistencia relacional para `vehiculos-service` y `operaciones-service` en bases de datos separadas.

### Diagrama lógico
```text
cliente externo
   |
   v
API Gateway (8080)
   |
   |-------------> vehiculos-service (8081)
   |
   |-------------> operaciones-service (8082)
                          |
                          v
                consulta a vehiculos-service por Eureka

Eureka Server (8761) registra:
- gateway-service
- vehiculos-service
- operaciones-service
```

## 3. Componentes del sistema
### 3.1 vehiculos-service
Responsable de administrar la base de datos de vehículos con CRUD completo, búsqueda por marca, modelo y estado, además de la actualización del estado del vehículo.

### 3.2 operaciones-service
Responsable de registrar, consultar, confirmar y cancelar solicitudes de alquiler. Este servicio **no accede directamente a la base de datos de vehículos**. Toda validación de existencia y disponibilidad se realiza mediante peticiones HTTP a `vehiculos-service` usando `OpenFeign` y el nombre registrado en Eureka: `vehiculos-service`.

### 3.3 eureka-server
Servidor de descubrimiento para registrar y ubicar servicios dinámicamente.

### 3.4 gateway-service
Punto único de acceso a través de rutas:
- `/api/vehiculos/**`
- `/api/operaciones/**`

## 4. Requisitos previos
- Java 17 o superior.
- Maven 3.9+ recomendado.
- Docker.
- Docker Compose.
- JMeter 5.6+ (opcional, para pruebas funcionales y de carga).

## 5. Cómo compilar
Desde la raíz del proyecto:

```bash
mvn clean package -DskipTests
```

## 6. Cómo ejecutar con Docker Compose
Desde la raíz del proyecto:

```bash
docker compose up --build
```

Para dejar los servicios en segundo plano:

```bash
docker compose up --build -d
```

Verifica que todos los contenedores estén en estado `Up`:

```bash
docker compose ps
```

## 7. Puertos utilizados
- `8761`: Eureka Server
- `8080`: Gateway Service
- `8081`: Vehículos Service
- `8082`: Operaciones Service
- `5432`: PostgreSQL

## 8. Endpoints principales
### Vehículos
- `POST /api/vehiculos`
- `GET /api/vehiculos`
- `GET /api/vehiculos/{id}`
- `PUT /api/vehiculos/{id}`
- `DELETE /api/vehiculos/{id}`
- `GET /api/vehiculos/buscar/marca/{marca}`
- `GET /api/vehiculos/buscar/modelo/{modelo}`
- `GET /api/vehiculos/buscar/estado/{estado}`
- `PUT /api/vehiculos/{id}/estado`

### Operaciones
- `POST /api/operaciones/solicitudes`
- `GET /api/operaciones/solicitudes`
- `GET /api/operaciones/solicitudes/{id}`
- `POST /api/operaciones/solicitudes/{id}/confirmar`
- `POST /api/operaciones/solicitudes/{id}/cancelar`

## 9. Acceso a Swagger
- Vehículos: `http://localhost:8081/swagger-ui.html`
- Operaciones: `http://localhost:8082/swagger-ui.html`

## 10. Evidencia visual de contenedores
Una vez levantado el proyecto, los contenedores esperados y verificados para esta solución son los siguientes:

- `alquiler-postgres` → `Up (healthy)`
- `eureka-server` → `Up (healthy)`
- `gateway-service` → `Up`
- `vehiculos-service` → `Up`
- `operaciones-service` → `Up`

Para complementar la entrega, se recomienda incluir capturas de pantalla del estado de estos contenedores una vez levantado el proyecto con Docker Compose.

### 10.1 Captura sugerida de Docker Desktop
La captura debe mostrar al menos los siguientes contenedores en estado `Up` o `healthy`:
- `alquiler-postgres`
- `eureka-server`
- `gateway-service`
- `vehiculos-service`
- `operaciones-service`

### 10.2 Captura sugerida desde terminal
También puede incluirse una captura del resultado del siguiente comando:

```bash
docker compose ps
```

O de forma más detallada:

```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### 10.3 Captura incluida en el proyecto
Se agregó la siguiente evidencia visual dentro del repositorio:

- `docs/capturas/contenedores-terminal.png`

### 10.4 Evidencia embebida
![Contenedores del proyecto desde terminal](docs/capturas/contenedores-terminal.png)

> Nota: al momento de la verificación, los contenedores del proyecto se encontraron activos con el estado esperado y la captura anterior corresponde a esa comprobación.

## 11. Evidencias adicionales de servicios

### 11.1 Eureka Server
![Eureka Server](docs/capturas/eureka-resumen.png)

### 11.2 Swagger UI de `vehiculos-service`
![Swagger Vehículos](docs/capturas/swagger-01.png)

### 11.3 Swagger UI de `operaciones-service`
![Swagger Operaciones](docs/capturas/swagger-02.png)

## 12. Pruebas con JMeter
El repositorio incluye dos planes de prueba:
- `jmeter-test-plan.jmx`: flujo funcional básico (crear vehículo, registrar solicitud, confirmar/cancelar).
- `jmeter-load-test-plan.jmx`: prueba de carga para evaluar rendimiento básico bajo concurrencia.

### 10.1 Ejecución en modo GUI
1. Abrir JMeter.
2. Ir a **File > Open** y seleccionar uno de los archivos `.jmx`.
3. Revisar el `Thread Group` (hilos, ramp-up, loops) según el escenario.
4. Ejecutar la prueba con el botón **Start**.

### 10.2 Ejecución en modo no GUI (recomendado para carga)
Desde la raíz del proyecto:

```bash
jmeter -n -t jmeter-load-test-plan.jmx -l resultados-carga.jtl -e -o reporte-carga
```

Para pruebas funcionales rápidas:

```bash
jmeter -n -t jmeter-test-plan.jmx -l resultados-funcional.jtl
```

Resultado esperado:
- Códigos HTTP en rango `2xx` para operaciones válidas.
- Sin errores de conexión contra `gateway-service`, `vehiculos-service` u `operaciones-service`.
- Métricas de tiempo de respuesta consistentes para la capacidad de tu entorno local.

## 13. Flujo de prueba recomendado (manual/API)
### Paso 1. Crear un vehículo disponible
```http
POST /api/vehiculos
Content-Type: application/json

{
  "marca": "Toyota",
  "modelo": "Corolla",
  "placa": "ABC123",
  "estado": "DISPONIBLE"
}
```

### Paso 2. Consultar vehículos disponibles
```http
GET /api/vehiculos/buscar/estado/DISPONIBLE
```

### Paso 3. Registrar una solicitud de alquiler
```http
POST /api/operaciones/solicitudes
Content-Type: application/json

{
  "vehiculoId": 1,
  "nombreCliente": "Cliente de prueba",
  "documentoCliente": "123456789",
  "fechaInicio": "2026-05-10",
  "fechaFin": "2026-05-15"
}
```

### Paso 4. Confirmar solicitud
```http
POST /api/operaciones/solicitudes/1/confirmar
```
Resultado esperado:
- La solicitud queda en estado `CONFIRMADA`.
- El vehículo cambia a `NO_DISPONIBLE`.

### Paso 5. Cancelar solicitud
```http
POST /api/operaciones/solicitudes/1/cancelar
```
Resultado esperado:
- La solicitud queda en estado `CANCELADA`.
- Si estaba confirmada, el vehículo vuelve a `DISPONIBLE`.

## 14. Cómo detener los contenedores
```bash
docker compose down
```

Si también deseas eliminar volúmenes:
```bash
docker compose down -v
```

## 15. Consideraciones de diseño
- Se utilizó Spring Boot para todos los servicios por alineación directa con la rúbrica.
- Se usó PostgreSQL como base de datos relacional.
- Cada microservicio tiene su propia responsabilidad y su propia persistencia.
- `operaciones-service` solo consulta y actualiza el estado del vehículo mediante llamadas HTTP a `vehiculos-service` a través de Eureka.
- El acceso principal del cliente se realiza por `gateway-service`.
