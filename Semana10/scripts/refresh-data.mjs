import {writeFile,mkdir} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
const base='https://rickandmortyapi.com/api/character';
async function get(url){for(let n=0;n<8;n++){const r=await fetch(url);if(r.ok)return r.json();if(r.status!==429&&r.status<500)throw new Error(`HTTP ${r.status}`);await new Promise(r=>setTimeout(r,2000*(n+1)))}throw new Error('API temporalmente no disponible')}
const first=await get(base);const results=[...first.results];for(let page=2;page<=first.info.pages;page++){await new Promise(r=>setTimeout(r,200));const d=await get(`${base}?page=${page}`);results.push(...d.results)}
if(results.length!==first.info.count)throw new Error('Conteo incompleto');await mkdir('data',{recursive:true});const payload={source:base,capturedAt:new Date().toISOString(),info:first.info,results};await writeFile('data/rick-characters.json.gz',gzipSync(JSON.stringify(payload)));await writeFile('data/source.json',JSON.stringify({source:base,capturedAt:payload.capturedAt,count:results.length,pages:first.info.pages},null,2));console.log(`Datos oficiales descargados: ${results.length} personajes en ${first.info.pages} páginas`);
