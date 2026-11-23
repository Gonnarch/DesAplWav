import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block rounded-3xl bg-gradient-to-br from-white/15 via-white/5 to-white/0 p-px transition duration-300 hover:-translate-y-1 hover:from-indigo-500 hover:via-violet-500 hover:to-cyan-400"
    >
      <div className="h-full overflow-hidden rounded-3xl bg-slate-900">
        <div className="relative h-52 overflow-hidden">
          {/* Imágenes con lazy loading */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
          {project.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/40 backdrop-blur">
              ★ Destacado
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="flex items-center justify-between text-xl font-bold text-white">
            {project.title}
            <span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-400">→</span>
          </h3>
          <p className="mb-5 mt-2 line-clamp-2 text-slate-400">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
