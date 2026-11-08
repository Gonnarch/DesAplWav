import { z } from 'zod';
import { Prisma } from '@prisma/client';
export const authorSchema=z.object({name:z.string().trim().min(1),email:z.email(),bio:z.string().nullable().optional(),nationality:z.string().nullable().optional(),birthYear:z.number().int().min(1).max(2100).nullable().optional()});
export const bookSchema=z.object({title:z.string().trim().min(1),description:z.string().nullable().optional(),isbn:z.string().trim().min(1).nullable().optional(),publishedYear:z.number().int().min(1).max(2100).nullable().optional(),genre:z.string().nullable().optional(),pages:z.number().int().positive().nullable().optional(),authorId:z.string().min(1)});
export type Context={params:Promise<{id:string}>};
export function fail(e:unknown){
 if(e instanceof z.ZodError)return Response.json({error:'Datos inválidos',details:e.issues},{status:400});
 if(e instanceof SyntaxError)return Response.json({error:'JSON inválido'},{status:400});
 if(e instanceof Prisma.PrismaClientKnownRequestError){
  if(e.code==='P2002')return Response.json({error:'El correo o ISBN ya existe'},{status:409});
  if(e.code==='P2025')return Response.json({error:'Registro no encontrado'},{status:404});
  if(e.code==='P2003')return Response.json({error:'El autor no existe'},{status:400});
 }
 return Response.json({error:'No se pudo completar la operación'},{status:500});
}
