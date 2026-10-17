import {omdb} from '../../../lib/omdb';
export async function GET(request:Request) {
 const url=new URL(request.url),params:Record<string,string>={};
 for(const key of ['s','i','y','type','page']) {const v=url.searchParams.get(key);if(v) params[key]=v;}
 if(!params.i && (!params.s || params.s.length<3)) return Response.json({error:'Escribe al menos 3 caracteres.'},{status:400});
 if(params.i) params.plot='full';
 try{return Response.json(await omdb(params),{headers:{'Cache-Control':'public, max-age=300'}})}
 catch(e){return Response.json({error:e instanceof Error ? e.message : 'No se pudo conectar con OMDb.'},{status:502})}
}
