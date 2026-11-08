import {prisma} from '@/lib/prisma';
import {fail} from '@/lib/api';
import {Prisma} from '@prisma/client';
export async function GET(req:Request){try{
 const q=new URL(req.url).searchParams;
 const page=Number(q.get('page')??1),rawLimit=Number(q.get('limit')??10);
 const sortBy=q.get('sortBy')??'createdAt',order=q.get('order')??'desc';
 if(!Number.isSafeInteger(page)||page<1||!Number.isSafeInteger(rawLimit)||rawLimit<1||!['title','publishedYear','createdAt'].includes(sortBy)||!['asc','desc'].includes(order))return Response.json({error:'Parámetros de paginación u orden inválidos'},{status:400});
 const limit=Math.min(50,rawLimit);
 const where:Prisma.BookWhereInput={
 ...(q.get('search')?{title:{contains:q.get('search')!,mode:'insensitive'}}:{}),
 ...(q.get('genre')?{genre:q.get('genre')!}:{}),
 ...(q.get('authorName')?{author:{name:{contains:q.get('authorName')!,mode:'insensitive'}}}:{}),
 ...(q.get('authorId')?{authorId:q.get('authorId')!}:{})};
 const [total,data]=await prisma.$transaction([prisma.book.count({where}),prisma.book.findMany({where,include:{author:true},skip:(page-1)*limit,take:limit,orderBy:[{[sortBy]:order},{id:'asc'}]})]);
 return Response.json({data,pagination:{page,limit,total,totalPages:Math.ceil(total/limit),hasNext:page*limit<total,hasPrev:page>1}});
}catch(e){return fail(e)}}
