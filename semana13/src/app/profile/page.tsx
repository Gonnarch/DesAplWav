import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Image from 'next/image';
import { FiUser, FiMail, FiKey } from 'react-icons/fi';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const provider = (user as { provider?: string })?.provider ?? 'credentials';

  const rows = [
    { icon: <FiUser />, label: 'Name', value: user?.name },
    { icon: <FiMail />, label: 'Email', value: user?.email },
    { icon: <FiKey />, label: 'Proveedor', value: provider },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="glass fade-up overflow-hidden rounded-3xl">
        <div className="h-32 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500" />
        <div className="px-8 pb-8">
          <div className="-mt-12 mb-4">
            {user?.image ? (
              <Image height={100} width={100} src={user.image} alt="Profile"
                className="h-24 w-24 rounded-full ring-4 ring-[#0d0d18]" />
            ) : (
              <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-4xl font-bold ring-4 ring-[#0d0d18]">
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-white/50">Información de tu cuenta</p>

          <div className="mt-6 space-y-3">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <span className="text-violet-300">{r.icon}</span>
                <span className="w-24 text-sm text-white/50">{r.label}</span>
                <span className="font-semibold">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
