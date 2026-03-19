'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { clearStoredPortalUser, getStoredPortalUser, hasSupabaseConfig, setStoredPortalUser } from '../lib/portal-auth';
import {
  accreditationQuestions,
  adminDocuments,
  crmInvestors,
  databaseTables,
  documents,
  investmentSummary,
  onboardingSteps,
  portalDisclaimer,
  portalStatus,
} from '../lib/portal-data';

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
  return (
    <div className="portal-stack">
      <PortalHeroBlock
        eyebrow="Investor dashboard"
        title="Premium portal for accredited investor onboarding"
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
          <h3>Latest files</h3>
          <div className="portal-list">
            {documents.map((item) => (
              <Link key={item.href} href={item.href} className="portal-list-row portal-list-link">
                <strong>{item.title}</strong>
                <span>{item.status}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortalDocumentsIndex() {
  return (
    <div className="portal-stack">
      <PortalHeroBlock
        eyebrow="Document room"
        title="Review offering materials in one place"
        description="This library centralizes the materials an accredited investor would typically review before subscription. Download links below are placeholders pending attorney-approved final versions."
      />
      <PortalNotice tone="warning" />
      <div className="grid-2">
        {documents.map((item) => (
          <div className="card" key={item.href}>
            <span className="eyebrow">{item.type}</span>
            <h3>{item.title}</h3>
            <p>{item.status}</p>
            <div className="dual-cta">
              <Link href={item.href} className="button button-primary">View page</Link>
              <a href="#" className="button button-light">Download placeholder</a>
            </div>
          </div>
        ))}
      </div>
      <div className="grid-3">
        <Link href="/portal/legal/risk-disclosures" className="card"><span className="eyebrow">Legal</span><h3>Risk disclosures</h3><p>Review core investor risk framing.</p></Link>
        <Link href="/portal/legal/terms" className="card"><span className="eyebrow">Legal</span><h3>Portal terms</h3><p>Portal usage, confidentiality, and access rules.</p></Link>
        <Link href="/portal/legal/privacy" className="card"><span className="eyebrow">Legal</span><h3>Investor data privacy</h3><p>How portal data should be handled and retained.</p></Link>
      </div>
    </div>
  );
}

export function PortalDocumentPage({ eyebrow, title, description, bullets = [] }) {
  return (
    <div className="portal-stack">
      <PortalHeroBlock eyebrow={eyebrow} title={title} description={description} />
      <PortalNotice tone="warning" />
      <div className="card">
        <h3>What this page covers</h3>
        <ul className="list-clean">
          {bullets.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="card">
        <h3>Download / signature state</h3>
        <p>Download and e-sign controls are intentionally presented as placeholders until the legal packet, storage workflow, and signature provider are finalized.</p>
        <div className="dual-cta">
          <a href="#" className="button button-primary">Download placeholder PDF</a>
          <a href="#" className="button button-light">E-sign placeholder</a>
        </div>
      </div>
    </div>
  );
}

export function OnboardingFlow() {
  const [investmentAmount, setInvestmentAmount] = useState('$100,000');

  return (
    <div className="portal-stack">
      <PortalHeroBlock eyebrow="Onboarding" title="Investor onboarding workflow" description="HomeStake handles accredited investor onboarding directly for a Reg D 506(c) raise. This MVP shows the full progression, with signature and payment steps clearly marked as not live." />
      <PortalNotice tone="warning" />
      <div className="grid-2">
        <div className="card">
          <span className="eyebrow">Progress</span>
          <h3>Seven-step sequence</h3>
          <div className="portal-timeline">
            {onboardingSteps.map((item) => (
              <div key={item.id} className="portal-timeline-item">
                <div className="portal-mini-metric">{item.step}</div>
                <strong>{item.title}</strong>
                <p className="small">{item.body}</p>
                <span className="portal-status-pill">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="portal-stack">
          <div className="card">
            <span className="eyebrow">Accreditation questionnaire</span>
            <h3>Self-certification basis</h3>
            <div className="portal-checklist">
              {accreditationQuestions.map((item) => (
                <label key={item} className="portal-checkbox-row">
                  <input type="checkbox" defaultChecked={item.includes('Income')} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="card">
            <span className="eyebrow">Commitment amount</span>
            <h3>Soft-circle your investment</h3>
            <input className="field" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} />
            <p className="small">This captures intent only. No live wire instructions or payment processing are active in this MVP.</p>
          </div>
          <div className="card">
            <span className="eyebrow">Verification upload</span>
            <h3>Document handoff placeholder</h3>
            <input type="file" className="field" disabled />
            <p className="small">Upload is visual-only right now. Final storage/access controls should be connected after attorney and security review.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccountSettings() {
  return (
    <div className="portal-stack">
      <PortalHeroBlock eyebrow="Account settings" title="Manage your investor profile" description="Maintain contact details, entity information, and communication preferences. Fields are editable UI placeholders for the MVP." />
      <div className="grid-2">
        <div className="card form-shell">
          <input className="field" defaultValue="Avery Thompson" />
          <input className="field" defaultValue="avery@familyoffice.com" />
          <input className="field" defaultValue="Thompson Family Office" />
          <select defaultValue="entity">
            <option value="entity">Investing as entity</option>
            <option value="individual">Investing individually</option>
          </select>
          <button className="button button-primary" type="button">Save placeholder changes</button>
        </div>
        <div className="card">
          <span className="eyebrow">Preferences</span>
          <h3>Communication controls</h3>
          <div className="portal-checklist">
            {['Quarterly updates', 'New document alerts', 'Capital call notifications', 'Deal milestone summaries'].map((item) => (
              <label key={item} className="portal-checkbox-row"><input type="checkbox" defaultChecked /><span>{item}</span></label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthCard({ mode = 'login' }) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const supabaseReady = hasSupabaseConfig();

  async function handleSubmit(event) {
    event.preventDefault();

    if (mode === 'signup') {
      setStoredPortalUser({ fullName, email, role: 'investor', verified: false });
      setMessage(supabaseReady ? 'Account created. Connect Supabase email verification next.' : 'Demo account created locally. Email verification page is simulated because Supabase env vars are missing.');
      router.push('/portal/verify-email');
      return;
    }

    const existing = getStoredPortalUser();
    if (existing?.email && existing.email === email) {
      setStoredPortalUser({ ...existing, email, lastLogin: new Date().toISOString() });
    } else {
      setStoredPortalUser({ fullName: 'Investor', email, role: 'investor', verified: !supabaseReady, lastLogin: new Date().toISOString() });
    }
    router.push('/portal');
  }

  return (
    <div className="portal-stack">
      <PortalHeroBlock
        eyebrow={mode === 'signup' ? 'Create account' : 'Investor login'}
        title={mode === 'signup' ? 'Open your investor portal account' : 'Access your investor workspace'}
        description="Use email/password auth for the MVP. Supabase can be connected later with the included environment hooks, while the app remains functional in demo mode today."
      />
      <PortalNotice tone="warning" />
      <div className="grid-2">
        <form className="card form-shell" onSubmit={handleSubmit}>
          {mode === 'signup' ? <input className="field" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required /> : null}
          <input className="field" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="button button-primary" type="submit">{mode === 'signup' ? 'Create account' : 'Log in'}</button>
          {message ? <p className="small">{message}</p> : null}
        </form>
        <div className="card">
          <span className="eyebrow">Auth notes</span>
          <h3>Protected route strategy</h3>
          <ul className="list-clean">
            <li>Public pages remain intact outside `/portal`.</li>
            <li>Supabase environment variables can power real auth later.</li>
            <li>The MVP keeps a graceful local demo mode so builds never break.</li>
          </ul>
          <div className="dual-cta">
            <Link href="/portal/login" className="button button-light">Login</Link>
            <Link href="/portal/signup" className="button button-light">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VerifyEmailPage() {
  return (
    <div className="portal-stack">
      <PortalHeroBlock eyebrow="Email verification" title="Check your inbox to verify your account" description="When Supabase is connected, this step becomes the real email verification handoff. In the MVP it is clearly shown as a staging checkpoint." actions={[{ href: '/portal/onboarding', label: 'Continue to onboarding', variant: 'button-primary' }]} />
      <PortalNotice tone="warning" />
      <div className="card">
        <h3>Verification workflow</h3>
        <ol className="list-clean">
          <li>Create account with email/password</li>
          <li>Send verification email</li>
          <li>Confirm email ownership</li>
          <li>Unlock protected investor routes</li>
        </ol>
      </div>
    </div>
  );
}

export function PortalAdminWorkspace() {
  return (
    <div className="portal-stack">
      <PortalHeroBlock eyebrow="Admin CRM" title="Investor operations and document control" description="Basic admin tooling for investor relationship management, accreditation review, commitment tracking, and document publishing — intentionally lean, but realistic for an MVP internal console." />
      <PortalNotice tone="warning" />
      <div className="grid-2">
        <div className="card">
          <span className="eyebrow">Registered investors</span>
          <h3>CRM overview</h3>
          <div className="portal-table-wrap">
            <table className="compare">
              <thead><tr><th>Name</th><th>Accreditation</th><th>Commitment</th><th>Stage</th></tr></thead>
              <tbody>
                {crmInvestors.map((item) => (
                  <tr key={item.name}><td><strong>{item.name}</strong><br />{item.entity}</td><td>{item.accreditation}</td><td>{item.commitment}</td><td>{item.stage}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <span className="eyebrow">Documents</span>
          <h3>Manage investor files</h3>
          <div className="portal-list">
            {adminDocuments.map((item) => (
              <div key={item.name} className="portal-list-row">
                <strong>{item.name}</strong>
                <span>{item.status} · {item.updated}</span>
              </div>
            ))}
          </div>
          <div className="dual-cta">
            <button className="button button-primary" type="button">Upload placeholder document</button>
            <button className="button button-light" type="button">Publish placeholder update</button>
          </div>
        </div>
      </div>
      <div className="card">
        <span className="eyebrow">Database schema</span>
        <h3>Core tables included in the MVP</h3>
        <div className="grid-2">
          {databaseTables.map(([name, body]) => (
            <div className="portal-mini-card" key={name}><strong>{name}</strong><p className="small">{body}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PortalGate({ children }) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const user = useMemo(() => (hydrated ? getStoredPortalUser() : null), [hydrated]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const publicRoutes = ['/portal/login', '/portal/signup', '/portal/verify-email'];
  if (publicRoutes.includes(pathname)) return children;
  if (!hydrated) return <div className="card"><p>Loading portal…</p></div>;
  if (!user) {
    return (
      <div className="portal-stack">
        <PortalHeroBlock eyebrow="Protected portal" title="Investor login required" description="Portal routes beyond signup/login are protected in the MVP. Sign in with the demo auth flow or connect Supabase for production-ready auth." actions={[{ href: '/portal/login', label: 'Go to login', variant: 'button-primary' }, { href: '/portal/signup', label: 'Create account', variant: 'button-light' }]} />
        <PortalNotice tone="warning" />
      </div>
    );
  }
  return (
    <>
      <div className="card portal-session-bar">
        <div>
          <span className="eyebrow">Signed in</span>
          <strong>{user.email}</strong>
        </div>
        <button className="button button-light" type="button" onClick={() => { clearStoredPortalUser(); window.location.href = '/portal/login'; }}>Sign out</button>
      </div>
      {children}
    </>
  );
}
