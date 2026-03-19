'use client';

export const PORTAL_USER_KEY = 'homestake.portal.user';

export function getStoredPortalUser() {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(PORTAL_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    window.localStorage.removeItem(PORTAL_USER_KEY);
    return null;
  }
}

export function setStoredPortalUser(user) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PORTAL_USER_KEY, JSON.stringify(user));
}

export function clearStoredPortalUser() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(PORTAL_USER_KEY);
}

export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
