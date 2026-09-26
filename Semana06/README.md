# Semana 06

Aplicación Social Media con Node.js, Express, EJS y MongoDB.

El proyecto se encuentra en [laboratorio06](laboratorio06/).

## Ejecución

Requisitos: Node.js 20 o posterior y MongoDB en ejecución.

Desde la carpeta Semana06:

```powershell
cd laboratorio06
npm ci
Copy-Item .env.example .env
npm run seed
npm run dev
```

Abrir http://localhost:3001/posts.

La configuración predeterminada usa `mongodb://127.0.0.1:27017/socialmedia`. Si MongoDB está en otra dirección, cambiar `MONGO_URI` en `.env`.

## Funciones

- Listar publicaciones con sus autores.
- Crear, editar y eliminar publicaciones desde formularios web.
- Registrar hashtags e imagen opcional.
- Validar edad, contraseña, título y contenido mediante Mongoose.
- Guardar las fechas de creación y actualización.

## Estructura

- `src/db`: conexión a MongoDB.
- `src/models`: esquemas de usuarios y publicaciones.
- `src/repositories`: consultas a la base de datos.
- `src/services`: reglas y validación de autores.
- `src/controllers` y `src/routes`: gestión de solicitudes.
- `src/views` y `src/public`: vistas EJS y estilos.
- `scripts`: datos de ejemplo y consultas de consola.
- `test`: validación de modelos y pruebas del CRUD.

## Pruebas

```powershell
npm test
```

Para incluir la prueba de integración con MongoDB:

```powershell
$env:TEST_MONGO_URI = 'mongodb://127.0.0.1:27017'
npm test
Remove-Item Env:TEST_MONGO_URI
```

La integración crea y elimina una base exclusiva de prueba; no utiliza la base `socialmedia`.
