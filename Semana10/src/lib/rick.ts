import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { join } from 'node:path';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
export interface Character {id:number;name:string;status:string;species:string;type:string;gender:string;origin:{name:string;url:string};location:{name:string;url:string};image:string;episode:string[];url:string;created:string}
export interface Page {info:{count:number;pages:number;next:string|null;prev:string|null};results:Character[]}
function buildSnapshot(): {info:Page['info'];results:Character[]} | null {if(process.env.LAB_BUILD_SNAPSHOT!=='1')return null;return JSON.parse(gunzipSync(readFileSync(join(process.cwd(),'data/rick-characters.json.gz'))).toString('utf8'))}
export const API='https://rickandmortyapi.com/api/character';
async function request(url:string){for(let attempt=0;attempt<6;attempt++){const r=await fetch(url,{cache:'force-cache',next:{revalidate:864000}});if(r.ok||r.status===404)return r;if(r.status!==429&&r.status<500)throw new Error(`API HTTP ${r.status}`);await new Promise(resolve=>setTimeout(resolve,1500*(attempt+1)))}throw new Error('API temporalmente no disponible')}
export async function getPage(page=1):Promise<Page>{const snapshot=buildSnapshot();if(snapshot)return {info:{...snapshot.info,next:page<snapshot.info.pages?`${API}?page=${page+1}`:null,prev:page>1?`${API}?page=${page-1}`:null},results:snapshot.results.slice((page-1)*20,page*20)};const r=await request(`${API}?page=${page}`);if(!r.ok)throw new Error('No se pudo consultar el archivo');return r.json()}
export async function getCharacter(id:string):Promise<Character>{if(!/^\d+$/.test(id))notFound();const snapshot=buildSnapshot();if(snapshot){const stored=snapshot.results.find(c=>c.id===Number(id));if(!stored)notFound();return stored;}const r=await request(`${API}/${id}`);if(r.status===404)notFound();if(!r.ok)throw new Error('Servicio no disponible');return r.json()}
export const allCharacters=unstable_cache(async function allCharacters(){const snapshot=buildSnapshot();if(snapshot)return snapshot.results;const first=await getPage();const items=[...first.results];for(let page=2;page<=first.info.pages;page++){items.push(...(await getPage(page)).results)}return items}, ["rick-all-characters-v1"], {revalidate:864000});
