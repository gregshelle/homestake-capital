'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase/client';

export const portalDisclaimer = 'This portal is a staged MVP for legal/compliance review. It is not a live securities offering, not a funding portal, and no payment or signature flow is active.';

export function PortalNotice({ tone = 'default' }) {
  return <div className={`notice${tone === 'warning' ? ' notice-warning' : ''}`}>{portalDisclaimer}</div>;
}

export function PortalHeroBlock({ eyebrow, title, description, actions = [] }) {
  return (
    <div className="card portal-hero-card">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {actions.length ? (
        <div className="dual-cta">
          {actions.map((action) => (
            <Link key={action.href} href={action.href} className={`button ${action.variant || 'button-light'}`}>
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function PortalDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/portal/profile');
        if (res.ok) {
          const { data } = await res.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const investmentSummary = {
    offeringName: profile?.commitment?.offering_name || 'HomeStake Capital Holdings I, LP',
    structure: 'Reg D 506(c) — accredited investors only',
    minimum: '$25,000',
    softCommitment: profile?.commitment?.investment_amount ? `$${parseFloat(profile.commitment.investment_amount).toLocaleString()}` : 'No commitment yet',
    targetClose: 'Q3 2026 target close window',
  };

  const portalStatus = {
    application: profile?.onboarding_step ? profile.onboarding_step.replace(/_/g, ' ') : 'In onboarding',
    accreditation: profile?.accreditation?.verification_status ? `${profile.accreditation.verification_status.charAt(0).toUpperCase() + profile.accreditation.verification_status.slice(1)}` : 'Pending questionnaire',
    investment: profile?.commitment?.commitment_status ? profile.commitment.commitment_status.replace(/_/g, ' ') : 'No commitment',
  };

  if (loading) {
    return <div className="card"><p>Loading dashboard…</p></div>;
  }

  return (
    <div className="portal-stack">
      <PortalHeroBlock
        eyebrow="Investor dashboard"
        title={`Welcome${profile?.full_name ? `, ${profile.full_name}` : ''}`}
        description="Track application progress, review offering materials, monitor your soft commitment, and prepare for final subscription steps — all in one branded portal experience."
        actions={[
          { href: '/portal/onboarding', label: 'Continue onboarding', variant: 'button-primary' },
          { href: '/portal/documents', label: 'Open document room', variant: 'button-light' },
        ]}
      />
      <PortalNotice tone="warning" />
      <div className="grid-3">
        {Object.entries(investmentSummary).map(([key, value]) => (
          <div className="card" key={key}>
            <span className="eyebrow">{key.replace(/([A-Z])/g, ' $1')}</span>
            <h3>{value}</h3>
          </div>
        ))}
      </div>
      <div className="grid-2">
        <div className="card">
          <span className="eyebrow">Status tracker</span>
          <h3>Application status</h3>
          <div className="portal-list">
            {Object.entries(portalStatus).map(([key, value]) => (
              <div key={key} className="portal-list-row">
                <strong>{key}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <span className="eyebrow">Document library</span>
          <h3>Key documents</h3>
          <div className="portal-list">
            <Link href="/portal/documents/ppm" className="portal-list-row portal-list-link">
              <strong>Private Placement Memorandum</strong>
              <span>Review required</span>
            </Link>
            <Link href="/portal/documents/subscription-agreement" className="portal-list-row portal-list-link">
              <strong>Subscription Agreement</strong>
              <span>Review required</span>
            </Link>
            <Link href="/portal/documents/form-d" className="portal-list-row portal-list-link">
              <strong>Form D Filing Summary</strong>
              <span>Reference</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Investor-Grade Auth Card
export function AuthCard({ mode = 'login' }) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [loading, setLoading] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email, password, options: { data: { full_name: fullName } }
        });
        if (error) { setMessage(error.message); setMessageType('error'); }
        else {
          setMessage('Account created. Please check your email to verify your account.');
          setMessageType('info');
          setTimeout(() => router.push('/portal/verify-email'), 1800);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) { setMessage(error.message); setMessageType('error'); }
        else router.push('/portal');
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
      setMessageType('error');
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  }

  const isLogin = mode === 'login';

  return (
    <div className="auth-page">
      {/* Left brand panel */}
      <div className="auth-panel-left">
        <div className="auth-panel-left-inner">
          <div className="auth-brand">
            <span className="auth-brand-mark">HomeStake Capital</span>
            <span className="auth-brand-sub">The public&apos;s private equity for home services</span>
          </div>
          <h1 className="auth-headline">
            {isLogin ? 'Your investor workspace awaits.' : 'Join the HomeStake community.'}
          </h1>
          <p className="auth-body">
            {isLogin
              ? 'Access offering documents, track your commitment, and monitor the build — all in one secure, encrypted workspace.'
              : 'Open your investor portal account to begin the accreditation process and review offering materials.'}
          </p>
          <div className="auth-stats">
            <div className="auth-stat"><strong>$600B+</strong><span>Category size</span></div>
            <div className="auth-stat"><strong>506(c)</strong><span>Reg D structure</span></div>
            <div className="auth-stat"><strong>$25K</strong><span>Minimum commitment</span></div>
            <div className="auth-stat"><strong>Q3 2026</strong><span>Target close</span></div>
          </div>
        </div>
        <div className="auth-compliance">
          <span className="auth-compliance-badge">Reg D 506(c)</span>
          <span className="auth-compliance-badge">Accredited investors only</span>
          <span className="auth-compliance-badge">Bank-level encryption</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-panel-right">
        <div className="auth-form-wrap">
          {/* Security badges */}
          <div className="auth-security-badges">
            <div className="auth-security-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Secure SSL</span>
            </div>
            
          </div>

          <h2 className="auth-form-title">{isLogin ? 'Sign in' : 'Create account'}</h2>
          <p className="auth-form-sub">
            {isLogin ? 'Access your investor portal' : 'Open your investor workspace'}
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate aria-label={isLogin ? 'Investor portal login' : 'Create investor account'}>
            <p className="required-legend">Fields marked <span className="required-star" aria-hidden="true">*</span> are required</p>
            {!isLogin && (
              <div className="form-field-group">
                <label className="form-label" htmlFor="auth-fullname">Full name <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
                <input
                  id="auth-fullname"
                  className="auth-field"
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  aria-required="true"
                  autoComplete="name"
                />
              </div>
            )}
            <div className="form-field-group">
              <label className="form-label" htmlFor="auth-email">Email address <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
              <input
                id="auth-email"
                className="auth-field"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
                autoComplete="email"
              />
            </div>
            <div className="form-field-group">
              <label className="form-label" htmlFor="auth-password">Password <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
              <input
                id="auth-password"
                className="auth-field"
                type="password"
                placeholder={isLogin ? 'Your password' : 'Min. 6 characters'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
                minLength={6}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
            </div>
            <button className="auth-submit" type="submit" disabled={loading} aria-busy={loading}>
              {loading ? <span className="auth-spinner" /> : null}
              {loading ? 'Processing…' : (isLogin ? 'Sign in to portal' : 'Create investor account')}
            </button>
            {message ? <p className={`auth-message${messageType === 'error' ? ' error' : ''}`} role="alert">{message}</p> : null}
          </form>

          <p className="auth-switch">
            {isLogin
              ? <>Don&apos;t have an account? <Link href="/portal/signup">Create one</Link></>
              : <>Already have an account? <Link href="/portal/login">Sign in</Link></>
            }
          </p>

          <p className="auth-disclaimer">
            This portal is a staged MVP for legal and compliance review. It is not a live securities offering.
            No payment or signature flow is active. Any future offering would be made only through formal
            offering materials where permitted.
          </p>
        </div>
      </div>
    </div>
  );
}

export function VerifyEmailPage() {
  return (
    <div className="portal-stack">
      <PortalHeroBlock eyebrow="Email verification" title="Check your inbox to verify your account" description="We have sent a verification email to your address. Please click the link in the email to activate your account." actions={[{ href: '/portal/login', label: 'Go to login', variant: 'button-primary' }]} />
      <PortalNotice tone="warning" />
    </div>
  );
}

export function PortalAdminWorkspace() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvestors() {
      try {
        const res = await fetch('/api/portal/admin/investors');
        if (res.ok) {
          const { data } = await res.json();
          setInvestors(data || []);
        }
      } catch (error) {
        console.error('Error fetching investors:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchInvestors();
  }, []);

  if (loading) {
    return <div className="card"><p>Loading admin data…</p></div>;
  }

  return (
    <div className="portal-stack">
      <PortalHeroBlock eyebrow="Admin CRM" title="Investor operations and document control" description="Basic admin tooling for investor relationship management, accreditation review, commitment tracking, and document publishing." />
      <PortalNotice tone="warning" />
      <div className="card">
        <span className="eyebrow">Registered investors</span>
        <h3>CRM overview</h3>
        <div className="portal-table-wrap">
          <table className="compare">
            <thead><tr><th>Name</th><th>Email</th><th>Accreditation</th><th>Commitment</th><th>Onboarding</th></tr></thead>
            <tbody>
              {investors.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.full_name}</strong><br />{item.entity_name}</td>
                  <td>{item.email}</td>
                  <td>{item.accreditation?.verification_status || 'Pending'}</td>
                  <td>{item.commitment ? `$${parseFloat(item.commitment.investment_amount).toLocaleString()}` : 'None'}</td>
                  <td>{item.onboarding_step?.replace(/_/g, ' ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function AccountSettings() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [entityName, setEntityName] = useState('');
  const [entityType, setEntityType] = useState('individual');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/portal/profile');
        if (res.ok) {
          const { data } = await res.json();
          setProfile(data);
          setFullName(data.full_name || '');
          setPhone(data.phone || '');
          setEntityName(data.entity_name || '');
          setEntityType(data.entity_type || 'individual');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/portal/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, phone, entity_name: entityName, entity_type: entityType })
      });
      if (res.ok) {
        const { data } = await res.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="card"><p>Loading settings…</p></div>;
  }

  return (
    <div className="portal-stack">
      <PortalHeroBlock eyebrow="Account settings" title="Manage your investor profile" description="Maintain contact details, entity information, and communication preferences." />
      <div className="grid-2">
        <div className="card form-shell">
          <input className="field" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input className="field" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className="field" placeholder="Entity name" value={entityName} onChange={(e) => setEntityName(e.target.value)} />
          <select className="field" value={entityType} onChange={(e) => setEntityType(e.target.value)}>
            <option value="individual">Investing as individual</option>
            <option value="entity">Investing as entity</option>
          </select>
          <button className="button button-primary" type="button" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
        <div className="card">
          <span className="eyebrow">Account info</span>
          <h3>Current status</h3>
          <div className="portal-list">
            <div className="portal-list-row"><strong>Email</strong><span>{profile?.email}</span></div>
            <div className="portal-list-row"><strong>Onboarding step</strong><span>{profile?.onboarding_step?.replace(/_/g, ' ')}</span></div>
            <div className="portal-list-row"><strong>Email verified</strong><span>{profile?.email_verified ? 'Yes' : 'No'}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortalGate({ children }) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    setHydrated(true);
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, [supabase]);

  const publicRoutes = ['/portal/login', '/portal/signup', '/portal/verify-email'];
  if (publicRoutes.includes(pathname)) return children;
  if (!hydrated) return <div className="card"><p>Loading portal…</p></div>;
  if (!user) {
    return (
      <div className="portal-stack">
        <PortalHeroBlock eyebrow="Protected portal" title="Investor login required" description="Portal routes beyond signup/login are protected. Sign in with the auth flow to access your investor workspace." actions={[{ href: '/portal/login', label: 'Go to login', variant: 'button-primary' }, { href: '/portal/signup', label: 'Create account', variant: 'button-light' }]} />
        <PortalNotice tone="warning" />
      </div>
    );
  }
  return (
    <>
      <div className="card portal-session-bar">
        <div><span className="eyebrow">Signed in</span><strong>{user.email}</strong></div>
        <button className="button button-light" type="button" onClick={() => { supabase.auth.signOut(); window.location.href = '/portal/login'; }}>Sign out</button>
      </div>
      {children}
    </>
  );
}
