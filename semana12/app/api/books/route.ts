import {prisma} from '@/lib/prisma';
import {bookSchema,fail} from '@/lib/api';
export async function GET(req:Request){try{return Response.json(await prisma.book.findMany({where:{...(new URL(req.url).searchParams.get('genre')?{genre:new URL(req.url).searchParams.get('genre')!}:{})},include:{author:true},orderBy:{createdAt:'desc'}}));}catch(e){return fail(e)}}
export async function POST(req:Request){try{const data=bookSchema.parse(await req.json());return Response.json(await prisma.book.create({data}),{status:201});}catch(e){return fail(e)}}
