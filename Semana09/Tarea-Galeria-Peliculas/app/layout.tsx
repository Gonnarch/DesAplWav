import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Cineclub · Tu próxima gran historia',description:'Descubre películas y series con OMDb. Cine para cada estado de ánimo.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
