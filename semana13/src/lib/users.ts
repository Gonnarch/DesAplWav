import fs from "fs";
import path from "path";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string; // hash bcrypt
  createdAt: string;
  failedAttempts: number;
  lockUntil: number | null;
};

export const MAX_ATTEMPTS = 3;
export const LOCK_TIME_MS = 5 * 60 * 1000; // 5 minutos

// En Vercel el FS es de solo lectura, se usa /tmp
const DB_PATH = process.env.VERCEL
  ? "/tmp/users.json"
  : path.join(process.cwd(), "data", "users.json");

function read(): StoredUser[] {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function write(users: StoredUser[]) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

export function findUserByEmail(email: string) {
  return read().find((u) => u.email === email.toLowerCase());
}

export function createUser(data: { name: string; email: string; password: string }) {
  const users = read();
  const user: StoredUser = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email.toLowerCase(),
    password: data.password,
    createdAt: new Date().toISOString(),
    failedAttempts: 0,
    lockUntil: null,
  };
  users.push(user);
  write(users);
  return user;
}

export function updateUser(email: string, patch: Partial<StoredUser>) {
  const users = read();
  const i = users.findIndex((u) => u.email === email.toLowerCase());
  if (i === -1) return;
  users[i] = { ...users[i], ...patch };
  write(users);
}
