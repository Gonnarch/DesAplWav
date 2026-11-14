'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { FiMail, FiLock, FiUser, FiAlertTriangle, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi';

type Tab = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    const result = await signIn('google', { callbackUrl: '/dashboard', redirect: false });
    if (result?.ok) router.push('/dashboard');
  };

  const handleGithubSignIn = () => signIn('github', { callbackUrl: '/dashboard' });

  const parseError = (err: string) => {
    if (err.startsWith('LOCKED:')) {
      const mins = Math.ceil(Number(err.split(':')[1]) / 60);
      setLocked(true);
      return `Cuenta bloqueada por demasiados intentos fallidos. Intenta de nuevo en ${mins} min.`;
    }
    setLocked(false);
    if (err.startsWith('WRONG:')) {
      const left = err.split(':')[1];
      return `Contraseña incorrecta. Te quedan ${left} intento(s) antes del bloqueo.`;
    }
    return err;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setSuccess(null);
    const res = await signIn('credentials', {
      email: form.email, password: form.password, redirect: false,
    });
    setLoading(false);
    if (res?.error) return setError(parseError(res.error));
    router.push('/dashboard');
    router.refresh();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setSuccess(null); setLocked(false);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error);
    setSuccess('Cuenta creada correctamente. Ya puedes iniciar sesión.');
    setTab('login');
    setForm({ ...form, password: '' });
  };

  const input = 'w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-violet-400/70 focus:bg-white/10 focus:ring-4 focus:ring-violet-500/15';

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10">
      <div className="glass fade-up w-full max-w-md rounded-3xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">
            {tab === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
          </h1>
          <p className="mt-2 text-sm text-white/50">
            {tab === 'login' ? 'Inicia sesión para continuar' : 'Regístrate en segundos'}
          </p>
        </div>

        {/* Tabs */}
        <div className="relative mb-6 grid grid-cols-2 rounded-xl bg-white/5 p-1 text-sm">
          <span className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 shadow-lg transition-all duration-300 ${tab === 'login' ? 'left-1' : 'left-[calc(50%+3px)]'}`} />
          {(['login', 'register'] as Tab[]).map((t) => (
            <button key={t} type="button"
              onClick={() => { setTab(t); setError(null); setSuccess(null); setLocked(false); }}
              className={`relative z-10 py-2 font-medium transition ${tab === t ? 'text-white' : 'text-white/50 hover:text-white/80'}`}>
              {t === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        {error && (
          <div key={error} className={`shake mb-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${locked ? 'border-amber-400/40 bg-amber-500/10 text-amber-200' : 'border-rose-400/40 bg-rose-500/10 text-rose-200'}`}>
            <FiAlertTriangle className="mt-0.5 shrink-0" /> {error}
          </div>
        )}
        {success && (
          <div className="fade-up mb-4 flex items-start gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            <FiCheckCircle className="mt-0.5 shrink-0" /> {success}
          </div>
        )}

        <form onSubmit={tab === 'login' ? handleLogin : handleRegister} className="space-y-4">
          {tab === 'register' && (
            <div className="relative fade-up">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input className={input} placeholder="Nombre completo" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
          )}
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input className={input} type="email" placeholder="correo@ejemplo.com" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input className={input} type={showPass ? 'text' : 'password'} placeholder="Contraseña" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button type="submit" disabled={loading || locked}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-[length:200%_100%] py-3 font-semibold text-white shadow-lg shadow-violet-600/30 transition-all hover:bg-right hover:shadow-violet-500/50 disabled:cursor-not-allowed disabled:opacity-40">
            {loading ? 'Procesando...' : tab === 'login' ? 'Ingresar' : 'Crear cuenta'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-white/30">
          <span className="h-px flex-1 bg-white/10" /> o continúa con <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white hover:text-black">
            <FaGoogle /> Google
          </button>
          <button onClick={handleGithubSignIn}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-[#24292f]">
            <FaGithub /> GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
