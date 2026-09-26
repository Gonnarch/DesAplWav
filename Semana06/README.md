# Semana 06 — Introducción a bases de datos NoSQL

Desarrollo de Aplicaciones Web Avanzado. Implementación de la guía **GLAB-S06-EAREVALO-2026-1**, organizada en el orden solicitado: primero el laboratorio y al final la tarea.

| Orden | Entrega | Contenido |
| --- | --- | --- |
| 1 | [Laboratorio](01-laboratorio/README.md) | Configuración, conexión a MongoDB, modelos básicos, repositorios, ejercicio de consola e integración con Express y EJS |
| 2 | [Tarea](02-tarea/README.md) | Modelos ampliados, validaciones, formularios y CRUD completo de publicaciones, evidencias y cinco conclusiones |

Cada etapa incluye su propio proyecto `mongo-node`, instrucciones de ejecución y capturas. Ejecutarlas en ese orden; detener la primera antes de iniciar la segunda con el mismo puerto. No se incluyen `node_modules` ni credenciales. La configuración local está documentada en `.env.example`.

## Correspondencia con la guía

- Configuración, dependencias y variables: `mongo-node/package.json`, `package-lock.json`, `.env.example`.
- Conexión: `src/db/database.js`.
- Modelos: `src/models/User.js` y `Post.js`.
- Persistencia: `src/repositories/`.
- Ejercicio de datos: `scripts/seed.js`, `scripts/demo-console.js`.
- Aplicación web: `src/services/`, `src/controllers/`, `src/routes/`, `src/views/`, `app.js`.
- Ampliación de esquemas y CRUD: `02-tarea/mongo-node/`.
- Capturas de la web y consultas MongoDB: `evidencias/` dentro de cada etapa.
- Conclusiones y enlace del repositorio: al final de [02-tarea/README.md](02-tarea/README.md).

## Entorno de las evidencias

Las comprobaciones se ejecutaron con bases MongoDB reales y aisladas para laboratorio y tarea. Se usaron temporalmente los puertos MongoDB 27018/27019 y web 3001/3002 para mantener ambas etapas disponibles durante la captura. Los dos proyectos se entregan con los valores locales de la guía: base `socialmedia`, MongoDB 27017 y web 3001. Las instancias de verificación no forman parte de las dependencias del proyecto.

Repositorio: [Gonnarch/DesAplWav](https://github.com/Gonnarch/DesAplWav).
