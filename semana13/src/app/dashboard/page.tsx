import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { FiShield, FiKey, FiLock, FiArrowRight } from 'react-icons/fi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const providerInfo: Record<string, { label: string; icon: React.ReactNode }> = {
  google: { label: 'Google OAuth', icon: <FaGoogle /> },
  github: { label: 'GitHub OAuth', icon: <FaGithub /> },
  credentials: { label: 'Credenciales', icon: <FiKey /> },
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const provider = (session?.user as { provider?: string })?.provider ?? 'credentials';
  const p = providerInfo[provider] ?? providerInfo.credentials;

  const cards = [
    { icon: <FiShield />, title: 'Sesión activa', value: 'JWT', color: 'from-violet-500 to-fuchsia-500' },
    { icon: p.icon, title: 'Proveedor', value: p.label, color: 'from-cyan-500 to-blue-500' },
    { icon: <FiLock />, title: 'Rutas protegidas', value: '/dashboard · /profile', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="glass fade-up rounded-3xl p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-white/40">Dashboard</p>
        <h1 className="mt-2 text-4xl font-bold">
          Bienvenido, <span className="text-gradient">{session?.user?.name}</span>
        </h1>
        <p className="mt-2 text-white/50">Has iniciado sesión de forma segura con NextAuth.js</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((c, i) => (
            <div key={c.title} style={{ animationDelay: `${i * 120}ms` }}
              className="fade-up group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-white/25">
              <div className={`mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${c.color} text-lg text-white shadow-lg`}>
                {c.icon}
              </div>
              <p className="text-sm text-white/50">{c.title}</p>
              <p className="mt-1 font-semibold">{c.value}</p>
            </div>
          ))}
        </div>

        <Link href="/profile"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-medium transition hover:gap-3 hover:bg-white/20">
          Ver mi perfil <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}
