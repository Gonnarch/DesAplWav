import { Metadata } from 'next';
import { personalInfo } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Contacta con ${personalInfo.name}, ${personalInfo.title}, para proyectos o colaboraciones`,
  openGraph: {
    title: 'Contacto - Portafolio',
    description: `Escríbele a ${personalInfo.name} para proyectos o colaboraciones`,
  },
};

const channels = [
  { icon: '✉', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: '⌘', label: 'GitHub', value: 'github.com/Gonnarch', href: personalInfo.github },
  { icon: 'in', label: 'LinkedIn', value: 'Carlos Daniel Carbajal Durand', href: personalInfo.linkedin },
  { icon: '⌖', label: 'Ubicación', value: 'Lima, Perú' },
];

export default function ContactPage() {
  return (
    <div className="grid-bg relative overflow-hidden">
      <div className="absolute -left-40 top-0 h-[26rem] w-[26rem] rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="container relative mx-auto max-w-6xl px-4 py-20">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Contacto</p>
          <h1 className="mt-3 text-5xl font-extrabold text-white">
            Hablemos de tu <span className="text-gradient">proyecto</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            ¿Tienes una idea, una propuesta o una oportunidad de prácticas? Escríbeme y te respondo lo antes posible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <aside className="space-y-4">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-lg font-bold text-white">
                    {c.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">{c.label}</span>
                    <span className="block truncate font-medium text-white">{c.value}</span>
                  </span>
                </>
              );
              const cls = 'flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-cyan-400/50';
              return c.href ? (
                <a key={c.label} href={c.href} className={cls} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={c.label} className={cls}>{inner}</div>
              );
            })}
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-sm text-emerald-200">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Respondo en menos de 24 horas.
            </div>
          </aside>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-indigo-950/50 backdrop-blur md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
