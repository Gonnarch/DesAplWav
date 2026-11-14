import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Provider from "@/components/SessionProvider";
import { HiShieldCheck } from "react-icons/hi";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "My Next Auth App",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <div className="bg-aurora"><span /><span /><span /></div>
        <div className="grid-overlay" />

        <nav className="sticky top-0 z-20 w-full border-b border-white/5 bg-black/30 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/30">
                <HiShieldCheck />
              </span>
              <span className="text-gradient">MyAuthApp</span>
            </Link>
            <ul className="flex items-center gap-6 text-sm text-white/70">
              <li><Link href="/dashboard" className="transition hover:text-white">Dashboard</Link></li>
              {session?.user && (
                <li><Link href="/profile" className="transition hover:text-white">Profile</Link></li>
              )}
              {session?.user && <li><LogoutButton /></li>}
              {session?.user?.image ? (
                <li>
                  <Image height={100} width={100} src={session.user.image} alt="Profile"
                    className="h-10 w-10 rounded-full ring-2 ring-violet-400/60" />
                </li>
              ) : session?.user ? (
                <li className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 font-bold text-white ring-2 ring-violet-400/60">
                  {session.user.name?.[0]?.toUpperCase()}
                </li>
              ) : null}
            </ul>
          </div>
        </nav>

        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
