// utils/storage.ts
import { storage } from '#imports';

export const STORAGE_KEYS = {
  helloCount: 'local:helloCount',
  installDate: 'local:installDate',
} as const;

export async function getHelloCount(): Promise<number> {
  return (await storage.getItem<number>(STORAGE_KEYS.helloCount)) ?? 0;
}

export async function incrementHelloCount(): Promise<number> {
  const next = (await getHelloCount()) + 1;
  await storage.setItem<number>(STORAGE_KEYS.helloCount, next);
  return next;
}

export async function resetHelloCount(): Promise<void> {
  await storage.removeItem(STORAGE_KEYS.helloCount);
}

export async function ensureInstallDate(): Promise<number> {
  const existing = await storage.getItem<number>(STORAGE_KEYS.installDate);
  if (existing != null) return existing;
  const now = Date.now();
  await storage.setItem<number>(STORAGE_KEYS.installDate, now);
  return now;
}

export async function getInstallDate(): Promise<number | null> {
  return (await storage.getItem<number>(STORAGE_KEYS.installDate)) ?? null;
}

