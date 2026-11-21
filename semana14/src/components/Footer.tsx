import Link from 'next/link';
import { personalInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{personalInfo.name}</p>
          <p className="mt-2 text-sm text-slate-400">{personalInfo.description}</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Navegación</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/projects" className="hover:text-white">Proyectos</Link></li>
            <li><Link href="/about" className="hover:text-white">Sobre Mí</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Redes</p>
          <div className="flex gap-3 text-sm">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-lg border border-slate-800 px-3 py-2 hover:border-indigo-500 hover:text-white">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg border border-slate-800 px-3 py-2 hover:border-indigo-500 hover:text-white">LinkedIn</a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="rounded-lg border border-slate-800 px-3 py-2 hover:border-indigo-500 hover:text-white">Email</a>
          </div>
        </div>
      </div>
      <p className="border-t border-slate-800 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {personalInfo.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
