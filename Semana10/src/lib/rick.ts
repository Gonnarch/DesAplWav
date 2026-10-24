import { cache } from 'react';
import { notFound } from 'next/navigation';
export interface Character {id:number;name:string;status:string;species:string;type:string;gender:string;origin:{name:string;url:string};location:{name:string;url:string};image:string;episode:string[];url:string;created:string}
export interface Page {info:{count:number;pages:number;next:string|null;prev:string|null};results:Character[]}
export const API='https://rickandmortyapi.com/api/character';
async function request(url:string){for(let attempt=0;attempt<6;attempt++){const r=await fetch(url,{cache:'force-cache',next:{revalidate:864000}});if(r.ok||r.status===404)return r;if(r.status!==429&&r.status<500)throw new Error(`API HTTP ${r.status}`);await new Promise(resolve=>setTimeout(resolve,1500*(attempt+1)))}throw new Error('API temporalmente no disponible')}
export async function getPage(page=1):Promise<Page>{const r=await request(`${API}?page=${page}`);if(!r.ok)throw new Error('No se pudo consultar el archivo');return r.json()}
export async function getCharacter(id:string):Promise<Character>{if(!/^\d+$/.test(id))notFound();const stored=(await allCharacters()).find(c=>c.id===Number(id));if(stored)return stored;const r=await request(`${API}/${id}`);if(r.status===404)notFound();if(!r.ok)throw new Error('Servicio no disponible');return r.json()}
export const allCharacters=cache(async function allCharacters(){const first=await getPage();const items=[...first.results];for(let page=2;page<=first.info.pages;page++){items.push(...(await getPage(page)).results)}return items});
