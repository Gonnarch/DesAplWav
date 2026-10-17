# Cineclub · Galería de películas y series

Aplicación React con componentes de servidor compatibles con Next.js App Router, ejecutada mediante Vinext, Tailwind CSS 4 y OMDb. Sitio responsive en español, fondo con pósteres en movimiento, búsqueda inmediata y fichas en un modal accesible.

## Ejecutar

Necesitas Node.js 22.13 o posterior.

1. Abre una terminal en esta carpeta.
2. Ejecuta `npm install`.
3. Copia `.env.example` a `.env.local` y coloca tu clave activada en `OMDB_API_KEY`.
4. Ejecuta `npm run dev` y abre la dirección que indique la terminal.

Para compilar: `npm run build`. Para servir la compilación: `npm start`.
La clave de ejemplo proporcionada en el enunciado se usa como respaldo; puede caducar o agotar su cuota. Solicita tu clave gratuita en https://www.omdbapi.com/apikey.aspx y actívala desde el correo que recibas. La aplicación no requiere registrar cuentas para buscar.

## Requisitos y justificación

| Requisito | Implementación | Justificación |
|---|---|---|
| Portada SSR | `app/page.tsx` es un Server Component async con `force-dynamic`. Consulta ocho IMDb ID con `Promise.allSettled`. | Los títulos y pósteres forman parte del HTML inicial, antes de la hidratación. Permite que la portada tenga contenido indexable y maneja fallos individuales. |
| Búsqueda CSR | `app/gallery.tsx` declara `'use client'` al inicio. Usa `useState` para texto, tipo, año, página, resultados y errores; `useEffect` para consultar al cambiar filtros. | La interacción necesita estado y eventos del navegador. Los resultados cambian sin navegación ni recarga. |
| async/await | Portada, servicio OMDb, ruta GET, búsqueda y detalles. | Mantiene legibles las consultas y el manejo de errores. |
| Tailwind CSS | Importación Tailwind 4, clases utilitarias y CSS propio para el diseño y las animaciones. | Permite ajustar visibilidad, distribución y diseño responsive. |
| Detalles | Modal nativo `dialog`, consulta `i=IMDb ID&plot=full`. | Se muestra sobre la misma galería, conservando búsqueda y página. Cierre con Escape, botón o fondo; foco restaurado al cerrar. |

La portada es una selección editorial de títulos populares, no una clasificación actual: OMDb no dispone de un endpoint de tendencias.

La ruta `app/api/movies/route.ts` consulta OMDb por HTTPS desde el servidor. Mantiene la clave fuera del código enviado al navegador y valida los parámetros. Las fichas usan título, año, clasificación, duración, género, sinopsis completa, director, guion, reparto, estreno, país, idioma, premios, temporadas, recaudación, producción, DVD, votos y puntuaciones cuando OMDb los proporciona. Los textos de OMDb se muestran en su idioma original.

## Cuidado de la cuota

La búsqueda espera 450 ms después de escribir y requiere tres caracteres. Cancela peticiones anteriores para evitar resultados desactualizados. La respuesta de la ruta declara caché pública de cinco minutos. Esto no garantiza una cuota disponible: las cargas SSR consultan ocho títulos y las consultas en curso pueden llegar a OMDb aunque el navegador las cancele. El plan gratuito tiene el límite indicado por OMDb.

## Accesibilidad y estados

Incluye etiquetas de campos, navegación por teclado, modal nativo con foco contenido, indicadores de carga, errores, ausencia de resultados, póster alternativo, paginación de hasta cien páginas y filtros. Los movimientos se pueden pausar y se desactivan con `prefers-reduced-motion`.

## Archivos principales

- `app/page.tsx`: SSR.
- `app/gallery.tsx`: interacciones CSR y modal.
- `app/api/movies/route.ts`: proxy de OMDb.
- `lib/omdb.ts`: cliente del servidor y selección inicial.
- `app/globals.css`: Tailwind, diseño responsive y animación.

Documentación oficial: https://www.omdbapi.com/
