import './globals.css';
import Link from 'next/link';
export const metadata={title:'Biblioteca | Semana 12',description:'Gestión de autores y libros'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="es"><body><header><Link className="brand" href="/">B / Biblioteca</Link><nav><Link href="/">Autores</Link><Link href="/books">Catálogo de libros</Link></nav><span>Laboratorio 12</span></header><main>{children}</main><footer>Biblioteca · Next.js + Prisma + PostgreSQL</footer></body></html>}
