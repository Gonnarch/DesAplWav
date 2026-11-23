import Image from 'next/image';
import Link from 'next/link';
import { projects, personalInfo } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

const stack = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Docker', 'Spring Boot', 'Flutter'];
const stats = [
  { value: '15+', label: 'Proyectos' },
  { value: '10+', label: 'Tecnologías' },
  { value: '100', label: 'SEO Lighthouse' },
];

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="grid-bg relative overflow-hidden">
        <div className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="container relative mx-auto grid items-center gap-14 px-4 py-20 md:grid-cols-[1.3fr_1fr] md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Disponible para prácticas y proyectos
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
              Hola, soy <span className="text-gradient">{personalInfo.name.split(' ')[0]}</span>
            </h1>
            <p className="mt-4 text-2xl font-semibold text-slate-300">{personalInfo.title}</p>
            <p className="mt-4 max-w-xl text-lg text-slate-400">{personalInfo.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/projects" className="rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:shadow-indigo-500/50">
                Ver Proyectos →
              </Link>
              <Link href="/contact" className="rounded-2xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10">
                Contáctame
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl font-extrabold text-white">{s.value}</dt>
                  <dd className="text-sm text-slate-400">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 opacity-60 blur-2xl" />
            <div className="animate-float relative aspect-square overflow-hidden rounded-[2.5rem] ring-1 ring-white/20">
              <Image
                src={personalInfo.avatar}
                alt={personalInfo.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 80vw, 384px"
              />
            </div>
            <div className="absolute -bottom-5 -left-6 rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-3 shadow-xl backdrop-blur">
              <p className="text-xs text-slate-400">Estudiando</p>
              <p className="font-semibold text-white">Diseño y Desarrollo de Software</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech marquee */}
      <section className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-lg font-semibold text-slate-500">
          {[...stack, ...stack].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t} <span className="text-indigo-500">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Portafolio</p>
            <h2 className="mt-2 text-4xl font-bold text-white">Proyectos Destacados</h2>
          </div>
          <Link href="/projects" className="font-semibold text-indigo-300 transition hover:text-cyan-300">
            Ver todos →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 p-10 text-center md:p-14">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
          <h2 className="relative text-3xl font-extrabold text-white md:text-4xl">¿Tienes un proyecto en mente?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-indigo-100">Hagamos algo increíble juntos. Escríbeme y conversemos.</p>
          <Link href="/contact" className="relative mt-8 inline-block rounded-2xl bg-white px-8 py-3.5 font-semibold text-indigo-700 shadow-xl transition hover:-translate-y-0.5">
            Hablemos
          </Link>
        </div>
      </section>
    </>
  );
}
