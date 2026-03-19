'use client';

import { useEffect, useMemo, useState } from 'react';

const storageKey = 'homestake.portal.admin.session';

const operationalQueue = [
  ['Investor approvals', '7 pending', 'Confirm completed onboarding and accreditation workflow.'],
  ['Document publishing', '2 drafts', 'Push the latest disclosures and monthly update pack.'],
  ['Support triage', '4 unread', 'Respond to investor questions and route compliance items.'],
];

const adminChecks = [
  'Review portal onboarding completions',
  'Publish document room updates',
  'Sync investor milestone notes with the public portal view',
  'Resolve operator inbox items before end of day',
];

export function PortalAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const envReady = Boolean(supabaseUrl && supabaseAnonKey);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(storageKey);

    if (stored) {
      try {
        setSession(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
  }, []);

  const sessionLabel = useMemo(() => {
    if (!session?.email) {
      return 'No active admin session';
    }

    return `Signed in as ${session.email}`;
  }, [session]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (!envReady) {
      setMessage('Supabase env vars are missing. Admin auth is disabled and the page is in preview mode.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          apikey: supabaseAnonKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.msg || payload?.error_description || 'Unable to sign in.');
      }

      const nextSession = {
        email: payload.user?.email || email,
        accessToken: payload.access_token,
        refreshToken: payload.refresh_token,
      };

      setSession(nextSession);
      window.localStorage.setItem(storageKey, JSON.stringify(nextSession));
      setPassword('');
      setMessage('Admin session established.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSignOut() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey);
    }

    setSession(null);
    setMessage('Signed out.');
  }

  return (
    <div className="portal-stack">
      <div className="card">
        <span className="eyebrow">Portal admin</span>
        <h2>Operator controls</h2>
        <p>
          This route stays under <code>/portal/admin</code> so the back-office experience remains in the
          same shell as the investor-facing portal. Authentication uses Supabase when client env vars are
          present.
        </p>
        <div className={`notice${envReady ? '' : ' notice-warning'}`}>
          {envReady
            ? 'Supabase env vars detected. Email/password sign-in is available for local or deployed admin use.'
            : 'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing. The page falls back to a read-only preview state.'}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <span className="eyebrow">Session</span>
          <h3>{sessionLabel}</h3>
          <p className="small">
            Use a Supabase auth user to open the admin workspace. Without env vars, this panel remains safe
            and informative instead of erroring.
          </p>
          <form className="form-shell" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="admin@homestakecapital.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={!envReady || loading}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={!envReady || loading}
            />
            <div className="portal-actions">
              <button type="submit" className="button button-primary" disabled={!envReady || loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              <button
                type="button"
                className="button button-light"
                onClick={handleSignOut}
                disabled={!session}
              >
                Sign out
              </button>
            </div>
          </form>
          {message ? <p className="small portal-message">{message}</p> : null}
        </div>

        <div className="card">
          <span className="eyebrow">Daily checks</span>
          <h3>Admin checklist</h3>
          <ul className="list-clean">
            {adminChecks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <span className="eyebrow">Operational queue</span>
        <h3>What the team needs to process</h3>
        <div className="grid-3">
          {operationalQueue.map(([title, metric, body]) => (
            <div key={title} className="portal-mini-card">
              <div className="portal-mini-metric">{metric}</div>
              <strong>{title}</strong>
              <p className="small">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
