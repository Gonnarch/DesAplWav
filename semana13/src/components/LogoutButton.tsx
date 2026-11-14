'use client';

import { signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/signIn' })}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-rose-400/50 hover:bg-rose-500/20 hover:text-white"
    >
      <FiLogOut /> Cerrar Sesión
    </button>
  );
}
