import {prisma} from '@/lib/prisma';
import {fail,Context} from '@/lib/api';
export async function GET(req:Request,ctx:Context){try{const {id}=await ctx.params;const author=await prisma.author.findUnique({where:{id},include:{books:true}});if(!author)return Response.json({error:'Autor no encontrado'},{status:404});return Response.json({author:{id:author.id,name:author.name},totalBooks:author.books.length,books:author.books});}catch(e){return fail(e)}}
