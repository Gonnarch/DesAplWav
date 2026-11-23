import Link from 'next/link';
import { personalInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="text-xl font-bold text-white">
            Carlos<span className="text-cyan-400">.dev</span>
          </p>
          <p className="mt-3 max-w-xs text-sm">{personalInfo.description}</p>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Navegación</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/projects" className="transition hover:text-cyan-400">Proyectos</Link></li>
            <li><Link href="/about" className="transition hover:text-cyan-400">Sobre Mí</Link></li>
            <li><Link href="/contact" className="transition hover:text-cyan-400">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Redes</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-400/60 hover:text-white">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-400/60 hover:text-white">LinkedIn</a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-400/60 hover:text-white">Email</a>
          </div>
        </div>
      </div>
      <p className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {personalInfo.name}. Hecho con Next.js y Tailwind CSS.
      </p>
    </footer>
  );
}
