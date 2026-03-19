'use client';

import { supabase } from './supabase/client';

const PORTAL_USER_KEY = 'homestake.portal.user';

// Local storage helpers for fallback/demo mode
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

// Check if Supabase is configured
export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Sign up with email/password
export async function signUp({ email, password, fullName }) {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;

  // Create profile record
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        auth_user_id: data.user.id,
        email: email,
        full_name: fullName,
        role: 'investor',
        onboarding_step: 'account_created',
        email_verified: false,
      });

    if (profileError) {
      console.error('Error creating profile:', profileError);
      // Don't throw here - auth succeeded, profile creation can be retried
    }
  }

  return data;
}

// Sign in with email/password
export async function signIn({ email, password }) {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Sign out
export async function signOut() {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase not configured');
  }

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current session
export async function getSession() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

// Get current user
export async function getCurrentUser() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

// Get user profile
export async function getUserProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('auth_user_id', user.id)
    .single();

  if (error) throw error;
  return data;
}

// Update user profile
export async function updateUserProfile(updates) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('auth_user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Check if user is admin
export async function isAdmin() {
  const profile = await getUserProfile();
  return profile?.role === 'admin';
}

// Resend verification email
export async function resendVerificationEmail(email) {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase not configured');
  }

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });

  if (error) throw error;
}

// Reset password
export async function resetPassword(email) {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase not configured');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/portal/reset-password`,
  });

  if (error) throw error;
}
