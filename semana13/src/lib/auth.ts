import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { findUserByEmail, updateUser, MAX_ATTEMPTS, LOCK_TIME_MS } from "@/lib/users";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Completa email y contraseña");
        }

        const user = findUserByEmail(credentials.email);
        if (!user) throw new Error("Usuario no registrado");

        // ¿Cuenta bloqueada?
        if (user.lockUntil && user.lockUntil > Date.now()) {
          const secs = Math.ceil((user.lockUntil - Date.now()) / 1000);
          throw new Error(`LOCKED:${secs}`);
        }

        const ok = await bcrypt.compare(credentials.password, user.password);

        if (!ok) {
          const attempts = (user.lockUntil ? 0 : user.failedAttempts) + 1;
          if (attempts >= MAX_ATTEMPTS) {
            updateUser(user.email, { failedAttempts: 0, lockUntil: Date.now() + LOCK_TIME_MS });
            throw new Error(`LOCKED:${LOCK_TIME_MS / 1000}`);
          }
          updateUser(user.email, { failedAttempts: attempts, lockUntil: null });
          throw new Error(`WRONG:${MAX_ATTEMPTS - attempts}`);
        }

        // Login correcto -> reinicia contador
        updateUser(user.email, { failedAttempts: 0, lockUntil: null });
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signIn" },
  callbacks: {
    async jwt({ token, account }) {
      if (account) token.provider = account.provider;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { provider?: string }).provider = token.provider as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
