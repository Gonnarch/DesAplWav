import Image from 'next/image';
import Link from 'next/link';
import { projects, personalInfo } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-cyan-500 text-white">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="container relative mx-auto grid items-center gap-10 px-4 py-20 md:grid-cols-[auto_1fr]">
          <div className="relative mx-auto h-40 w-40 md:h-52 md:w-52">
            <Image
              src={personalInfo.avatar}
              alt={personalInfo.name}
              fill
              className="rounded-3xl object-cover shadow-2xl ring-4 ring-white/30"
              priority
              sizes="208px"
            />
          </div>
          <div className="text-center md:text-left">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
              Disponible para proyectos
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
              {personalInfo.name}
            </h1>
            <p className="mt-3 text-xl text-indigo-100 md:text-2xl">{personalInfo.title}</p>
            <p className="mt-4 max-w-2xl text-lg text-indigo-50/90">{personalInfo.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link href="/projects" className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5">
                Ver Proyectos
              </Link>
              <Link href="/contact" className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Contáctame
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Portafolio</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Proyectos Destacados</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
