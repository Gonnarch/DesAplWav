import { Metadata } from 'next';
import { projects } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Explora mi colección de proyectos de desarrollo web y aplicaciones',
  openGraph: {
    title: 'Proyectos - Portafolio',
    description: 'Explora mi colección de proyectos de desarrollo web',
    images: ['/og-projects.jpg'],
  },
};

export default function ProjectsPage() {
  return (
    <div className="grid-bg relative overflow-hidden">
      <div className="absolute -right-40 -top-20 h-96 w-96 rounded-full bg-violet-600/25 blur-3xl" />
      <div className="container relative mx-auto px-4 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Portafolio</p>
        <h1 className="mt-2 text-5xl font-extrabold text-white">Mis Proyectos</h1>
        <p className="mb-14 mt-4 max-w-2xl text-lg text-slate-400">
          Una colección de proyectos en los que he trabajado, desde e-commerce hasta dashboards en tiempo real.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
