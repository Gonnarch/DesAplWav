import {prisma} from '@/lib/prisma';
import {authorSchema,fail} from '@/lib/api';
export async function GET(req:Request){try{return Response.json(await prisma.author.findMany({where:{},include:{_count:{select:{books:true}}},orderBy:{createdAt:'desc'}}));}catch(e){return fail(e)}}
export async function POST(req:Request){try{const data=authorSchema.parse(await req.json());return Response.json(await prisma.author.create({data}),{status:201});}catch(e){return fail(e)}}
