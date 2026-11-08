import {prisma} from '@/lib/prisma';
import {authorSchema,fail,Context} from '@/lib/api';
export async function GET(req:Request,ctx:Context){try{const {id}=await ctx.params;const data=await prisma.author.findUnique({where:{id},include:{_count:{select:{books:true}}}});return data?Response.json(data):Response.json({error:'Registro no encontrado'},{status:404});}catch(e){return fail(e)}}
export async function PUT(req:Request,ctx:Context){try{const {id}=await ctx.params;const data=authorSchema.partial().parse(await req.json());return Response.json(await prisma.author.update({where:{id},data}));}catch(e){return fail(e)}}
export async function DELETE(req:Request,ctx:Context){try{const {id}=await ctx.params;await prisma.author.delete({where:{id}});return Response.json({message:'Registro eliminado correctamente'});}catch(e){return fail(e)}}
