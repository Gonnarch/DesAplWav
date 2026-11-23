import { Metadata } from 'next';
import Image from 'next/image';
import { personalInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sobre Mí',
  description: `Conoce más sobre ${personalInfo.name}, ${personalInfo.title}`,
};

const skills = [
  { name: 'JavaScript/TypeScript', level: 90 },
  { name: 'React & Next.js', level: 88 },
  { name: 'Node.js & Express', level: 80 },
  { name: 'PostgreSQL & MongoDB', level: 75 },
  { name: 'Tailwind CSS', level: 92 },
  { name: 'Git & GitHub', level: 85 },
  { name: 'Docker', level: 65 },
  { name: 'AWS', level: 55 },
];

const timeline = [
  { year: '2024', title: 'Inicio en Tecsup', text: 'Comencé la carrera de Diseño y Desarrollo de Software.' },
  { year: '2025', title: 'Primeros proyectos full stack', text: 'Apps con React, Spring Boot y bases de datos relacionales.' },
  { year: '2026', title: 'Web avanzado y móvil', text: 'Next.js con SEO, Flutter, iOS y proyectos IoT.' },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="container relative mx-auto max-w-5xl px-4 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Sobre Mí</p>
        <h1 className="mt-2 text-5xl font-extrabold text-white">¡Hola! Soy {personalInfo.name}</h1>

        <div className="mt-12 grid items-start gap-10 md:grid-cols-[1fr_1.6fr]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-cyan-400 opacity-50 blur-xl" />
            <div className="relative aspect-square overflow-hidden rounded-[2rem] ring-1 ring-white/20">
              <Image
                src={personalInfo.avatar}
                alt={personalInfo.name}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
          <div className="space-y-4 text-lg text-slate-300">
            <p>
              Soy desarrollador full stack y estudiante de Diseño y Desarrollo de Software en Tecsup.
              Me apasiona crear aplicaciones web modernas, rápidas y bien posicionadas.
            </p>
            <p>
              Me enfoco en escribir código limpio y mantenible, aplicando buenas prácticas de
              rendimiento, accesibilidad y SEO en cada proyecto.
            </p>
            <p>
              Cuando no estoy programando, exploro nuevas tecnologías, trabajo en proyectos IoT y
              apoyo en la librería familiar con soluciones digitales.
            </p>
          </div>
        </div>

        {/* Skills */}
        <section className="mt-20">
          <h2 className="mb-8 text-3xl font-bold text-white">Habilidades Técnicas</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 flex justify-between text-sm">
                  <span className="font-semibold text-white">{skill.name}</span>
                  <span className="text-slate-400">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-20">
          <h2 className="mb-8 text-3xl font-bold text-white">Mi Trayectoria</h2>
          <ol className="relative space-y-8 border-l border-white/15 pl-8">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 ring-4 ring-slate-950" />
                <p className="text-sm font-semibold text-cyan-400">{t.year}</p>
                <h3 className="text-xl font-bold text-white">{t.title}</h3>
                <p className="text-slate-400">{t.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
