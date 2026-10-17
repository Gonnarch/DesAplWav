import Gallery from './gallery';
import { omdb, popularIds } from '../lib/omdb';
export const dynamic = 'force-dynamic';
// Server Component: la galería inicial llega en el HTML del servidor.
export default async function Home() {
 const results = await Promise.allSettled(popularIds.map(i => omdb({i})));
 const movies = results.flatMap(r => r.status === 'fulfilled' ? [r.value] : []);
 return <Gallery initialMovies={movies} initialError={movies.length ? '' : 'No pudimos cargar OMDb. Revisa tu conexión o configura una clave válida en OMDB_API_KEY.'}/>;
}
