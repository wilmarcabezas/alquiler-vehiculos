# Levantar backend + frontend completo

Desde la raíz del proyecto:

```bash
docker compose -f docker-compose.full.yml up --build -d
```

## Servicios publicados
- Frontend: http://localhost:3000
- Gateway: http://localhost:8080
- Vehículos: http://localhost:8081
- Operaciones: http://localhost:8082
- Eureka: http://localhost:8761
- PostgreSQL: localhost:5432

## Detener todo
```bash
docker compose -f docker-compose.full.yml down
```

## Detener y borrar volúmenes
```bash
docker compose -f docker-compose.full.yml down -v
```

## Observación importante
El Gateway queda preparado como punto único de entrada del backend para el frontend:
- http://localhost:8080/api/vehiculos/**
- http://localhost:8080/api/operaciones/**

Las rutas usan Eureka y `lb://` para resolver `vehiculos-service` y `operaciones-service`. Los puertos 8081 y 8082 se mantienen publicados solo para diagnóstico/desarrollo directo de cada microservicio.
