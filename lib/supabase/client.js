import { createBrowserClient } from '@supabase/ssr';

let client = null;

export function createClient() {
  // Return cached client if exists
  if (client) return client;
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    // In development/build, return a mock client
    if (process.env.NODE_ENV === 'development' || !url) {
      console.warn('Supabase environment variables not configured. Using mock client.');
      return {
        auth: {
          getSession: () => Promise.resolve({ data: { session: null }, error: null }),
          getUser: () => Promise.resolve({ data: { user: null }, error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          signUp: () => Promise.reject(new Error('Supabase not configured')),
          signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
          signOut: () => Promise.resolve({ error: null }),
        },
        from: () => ({
          select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
          insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
          update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }) }),
        }),
      };
    }
    
    // In production with missing env vars, throw an error
    throw new Error('Missing required Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  
  // Validate URL format
  try {
    new URL(url);
  } catch {
    throw new Error('Invalid NEXT_PUBLIC_SUPABASE_URL format');
  }
  
  client = createBrowserClient(url, key);
  return client;
}

export const supabase = new Proxy({}, {
  get(target, prop) {
    const client = createClient();
    return client[prop];
  }
});
