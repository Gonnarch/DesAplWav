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
  { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { label: 'GitHub', value: 'github.com/Gonnarch', href: personalInfo.github },
  { label: 'Ubicación', value: 'Lima, Perú' },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Contacto</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900">Hablemos de tu proyecto</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            ¿Tienes una idea o una propuesta? Escríbeme y te respondo lo antes posible.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_1.6fr]">
          <aside className="space-y-4 rounded-2xl bg-gradient-to-br from-indigo-700 to-cyan-600 p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold">Información</h2>
            <p className="text-indigo-100">Respondo en menos de 24 horas.</p>
            <ul className="space-y-4 pt-2">
              {channels.map((c) => (
                <li key={c.label} className="rounded-xl bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-100">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="font-medium hover:underline" target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                      {c.value}
                    </a>
                  ) : (
                    <p className="font-medium">{c.value}</p>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
