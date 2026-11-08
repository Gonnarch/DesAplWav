# Semana 12 Biblioteca

Aplicación del laboratorio de API Routes con Next.js App Router, TypeScript, Prisma y PostgreSQL. Incluye los cinco ejercicios y la tarea de búsqueda, filtros, paginación, estadísticas, dashboard y gestión de autores y libros.

## Ejecutar

1. Instalar Node.js 20.9 o superior y ejecutar `npm ci`.
2. Copiar `.env.example` a `.env` y configurar `DATABASE_URL` con una conexión PostgreSQL válida. El laboratorio utiliza el esquema aislado `semana12` de Neon.
3. Ejecutar `npx prisma db push` y `npx prisma generate`.
4. Ejecutar `npm run dev` y abrir http://localhost:3000.

## Verificación

Se ejecutaron 40 comprobaciones HTTP contra PostgreSQL en Neon. Incluyen CRUD, validación, duplicados, filtros combinados, búsqueda parcial sin distinguir mayúsculas, segunda página, límite máximo y estadísticas de un autor sin libros. Compilación y TypeScript completados correctamente.

La colección `Biblioteca.postman_collection.json` contiene solicitudes y ejemplos de respuestas reales obtenidas. Los identificadores corresponden a los datos de práctica; al crear registros nuevos hay que utilizar sus identificadores devueltos. La prueba `seed-and-test.mjs` agrega datos de ejemplo y elimina exclusivamente los registros temporales que crea.

## Vercel

Importar `Gonnarch/DesAplWav`, seleccionar `semana12` como Root Directory, preset Next.js y configurar `DATABASE_URL` como variable de entorno privada. El script de build genera Prisma antes de compilar. No publicar `.env` ni credenciales en el repositorio.

## API

- `/api/authors`: GET y POST.
- `/api/authors/[id]`: GET, PUT y DELETE. La eliminación del autor elimina también sus libros.
- `/api/authors/[id]/books`: GET.
- `/api/books`: GET, POST y filtro exacto `genre`.
- `/api/books/[id]`: GET, PUT y DELETE.
- `/api/books/search`: GET con `search`, `genre`, `authorName`, `page`, `limit`, `sortBy` y `order`. También admite `authorId` para el selector exacto de la interfaz.
- `/api/authors/[id]/stats`: GET con total, primera y última obra, promedio de páginas, géneros y libros con más y menos páginas.

Los años y páginas ausentes se excluyen de sus cálculos respectivos; un autor sin libros devuelve total cero, lista de géneros vacía y estadísticas no disponibles como null. Los datos bibliográficos se utilizan como material de práctica y los números de páginas corresponden a los ejemplares cargados.
