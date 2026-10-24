# Laboratorio 10

Node 20.9 o superior. Ejecutar npm install, npm run build y npm start.

Rutas: / (SSG + ISR 10 días), /ssr (SSR sin caché), /busqueda (CSR), /personajes/[id] (SSG + ISR 10 días), /pokemon (ISR 24 horas), /pokemon/[name] (151 rutas SSG), /pokemon/prueba-error (fallo controlado).

La API se consulta directamente, sin datos inventados. En Vercel importar el repositorio como Next.js. No requiere variables de entorno.

## Compilación reproducible

El build utiliza data/rick-characters.json.gz, descargado de todas las páginas de la API oficial mediante npm run refresh:data. Incluye source y capturedAt. Así se evitan cientos de peticiones repetidas al generar rutas. La variable LAB_BUILD_SNAPSHOT se aplica solo al proceso de build. En producción, las revalidaciones consultan la API con force-cache y revalidate:864000; SSR usa no-store y CSR consulta directamente. Para actualizar la instantánea antes de un nuevo build: npm run refresh:data.
