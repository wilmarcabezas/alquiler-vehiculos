# Sistema de Gestión de Alquiler de Vehículos · Front-End

Aplicación Front-End construida en React + Vite para integrarse con el backend existente del sistema de alquiler de vehículos.

## Requisitos
- Node.js 20+
- npm 10+
- Gateway/API disponible
  - Docker/Nginx proxy: `/api`
  - Desarrollo directo: `http://localhost:8080/api`

## Instalación
```bash
npm install
```

## Variables de entorno
Crear un archivo `.env` a partir de `.env.example`:
```bash
cp .env.example .env
```

Contenido base:
```env
VITE_API_BASE_URL=/api
# Para desarrollo directo contra el Gateway local:
# VITE_API_BASE_URL=http://localhost:8080/api
```

## Ejecución en desarrollo
```bash
npm run dev
```

## Build de producción
```bash
npm run build
```

## Vista previa del build
```bash
npm run preview
```

## Docker
Construir imagen:
```bash
docker build -t alquiler-vehiculos-frontend .
```

Ejecutar contenedor:
```bash
docker run -d -p 3000:80 --name alquiler-frontend alquiler-vehiculos-frontend
```

## Endpoints esperados del backend
### Vehículos
- `GET /vehiculos`
- `GET /vehiculos/:id`
- `POST /vehiculos`
- `PUT /vehiculos/:id/estado`

### Operaciones
- `POST /operaciones/solicitudes`
- `GET /operaciones/solicitudes`

## Nota técnica importante
El Front-End consume una única API base configurada con `VITE_API_BASE_URL`. En Docker/Nginx se recomienda `/api`, y para ejecutar Vite directamente contra el Gateway local puede usarse `http://localhost:8080/api`.

## Restricción funcional del backend actual
El backend disponible solo admite estos estados de vehículo:
- `DISPONIBLE`
- `NO_DISPONIBLE`

Por esa razón, la interfaz administrativa fue ajustada para no enviar estados no soportados como `MANTENIMIENTO` o `INACTIVO`, evitando errores 500 en tiempo de ejecución.
