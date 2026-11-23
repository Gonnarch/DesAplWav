import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-600/25 blur-3xl" />
      <div className="container relative mx-auto max-w-5xl px-4 py-16">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:text-white"
        >
          ← Volver a Proyectos
        </Link>

        <article>
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-400">{project.description}</p>

          <div className="relative mt-10 h-96 w-full overflow-hidden rounded-3xl ring-1 ring-white/15 md:h-[28rem]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.5fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-white">Tecnologías Utilizadas</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-bold text-white">Enlaces</h2>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
                >
                  Ver Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/15 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Ver Código
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
