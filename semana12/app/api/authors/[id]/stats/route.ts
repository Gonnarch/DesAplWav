import {prisma} from '@/lib/prisma';
import {fail,Context} from '@/lib/api';
export async function GET(req:Request,ctx:Context){try{
 const {id}=await ctx.params;const a=await prisma.author.findUnique({where:{id},include:{books:true}});
 if(!a)return Response.json({error:'Autor no encontrado'},{status:404});
 const dated=a.books.filter(b=>b.publishedYear!==null).sort((a,b)=>a.publishedYear!-b.publishedYear!);
 const paged=a.books.filter(b=>b.pages!==null).sort((a,b)=>a.pages!-b.pages!);
 const year=(b:typeof dated[number]|undefined)=>b?{title:b.title,year:b.publishedYear}:null;
 const pages=(b:typeof paged[number]|undefined)=>b?{title:b.title,pages:b.pages}:null;
 return Response.json({authorId:a.id,authorName:a.name,totalBooks:a.books.length,firstBook:year(dated[0]),latestBook:year(dated.at(-1)),averagePages:paged.length?Math.round(paged.reduce((s,b)=>s+b.pages!,0)/paged.length*100)/100:null,genres:[...new Set(a.books.map(b=>b.genre).filter(Boolean))].sort(),longestBook:pages(paged.at(-1)),shortestBook:pages(paged[0])});
}catch(e){return fail(e)}}
