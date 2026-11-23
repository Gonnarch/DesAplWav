'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-16 text-center">
        <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-3xl text-emerald-300 ring-1 ring-emerald-400/40">✓</div>
        <h2 className="text-3xl font-bold text-white">¡Mensaje enviado!</h2>
        <p className="mt-2 text-slate-400">Gracias por escribir, te responderé pronto.</p>
        <button onClick={() => setSent(false)} className="mt-8 rounded-xl border border-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const input =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/20';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-5"
    >
      <h2 className="text-2xl font-bold text-white">Envíame un mensaje</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Nombre</span>
          <input required name="name" className={input} placeholder="Tu nombre" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Email</span>
          <input required type="email" name="email" className={input} placeholder="tu@email.com" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-300">Asunto</span>
        <input required name="subject" className={input} placeholder="¿En qué te puedo ayudar?" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-300">Mensaje</span>
        <textarea required name="message" rows={5} className={input} placeholder="Cuéntame sobre tu proyecto..." />
      </label>
      <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5">
        Enviar mensaje →
      </button>
    </form>
  );
}
