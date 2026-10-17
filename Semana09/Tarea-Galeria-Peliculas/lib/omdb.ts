export type Movie = {imdbID:string;Title:string;Year:string;Type:string;Poster:string;[key:string]:any};
export const popularIds=['tt0816692','tt1375666','tt0468569','tt0111161','tt0133093','tt0903747','tt4574334','tt0137523'];
// Selección editorial: OMDb no ofrece un endpoint de tendencias.
export async function omdb(params:Record<string,string>) {
 const url=new URL('https://www.omdbapi.com/');
 url.search=new URLSearchParams({apikey:process.env.OMDB_API_KEY || 'f1def80d',...params}).toString();
 const response=await fetch(url,{signal:AbortSignal.timeout(12000)});
 if(!response.ok) throw new Error('El servicio no está disponible. Inténtalo de nuevo.');
 const data:any=await response.json();
 if(data.Response==='False') {
  if(data.Error?.includes('not found')) throw new Error('No encontramos títulos. Prueba otro nombre o año.');
  if(data.Error?.includes('Too many results')) throw new Error('Escribe un título más específico.');
  throw new Error('OMDb no pudo completar la consulta. Revisa la clave y su límite diario.');
 }
 return data;
}
