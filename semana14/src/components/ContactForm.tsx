'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-2xl text-emerald-600">✓</div>
        <h2 className="text-2xl font-bold text-slate-900">¡Mensaje enviado!</h2>
        <p className="mt-2 text-slate-600">Gracias por escribir, te responderé pronto.</p>
        <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-indigo-600 hover:underline">
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const input =
    'w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Nombre</span>
          <input required name="name" className={input} placeholder="Tu nombre" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
          <input required type="email" name="email" className={input} placeholder="tu@email.com" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Asunto</span>
        <input required name="subject" className={input} placeholder="¿En qué te puedo ayudar?" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Mensaje</span>
        <textarea required name="message" rows={5} className={input} placeholder="Cuéntame sobre tu proyecto..." />
      </label>
      <button type="submit" className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
        Enviar mensaje
      </button>
    </form>
  );
}
