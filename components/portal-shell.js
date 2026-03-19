'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/portal', label: 'Dashboard' },
  { href: '/portal/onboarding', label: 'Onboarding' },
  { href: '/portal/documents', label: 'Documents' },
  { href: '/portal/settings', label: 'Settings' },
  { href: '/portal/admin', label: 'Admin' },
];

export function PortalShell({ children }) {
  const pathname = usePathname();

  return (
    <section className="portal-shell section-tight">
      <div className="container portal-wrap">
        <div className="portal-banner card">
          <div>
            <span className="eyebrow">Investor portal</span>
            <h1 className="portal-title">HomeStake Capital investor workspace</h1>
            <p>
              A premium portal for accredited investors to register, verify status, review offering materials,
              track commitments, and communicate with HomeStake directly — with signature and payment actions
              clearly marked as placeholders until legal approval.
            </p>
          </div>
          <div className="portal-banner-meta">
            <div className="portal-chip">Reg D 506(c)</div>
            <div className="portal-chip">Accredited only</div>
            <div className="portal-chip">Not a live offering</div>
          </div>
        </div>
        <div className="portal-grid">
          <aside className="portal-sidebar card">
            <span className="eyebrow">Workspace</span>
            <nav className="portal-nav" aria-label="Portal navigation">
              {tabs.map((tab) => {
                const active = pathname === tab.href || (tab.href !== '/portal' && pathname.startsWith(tab.href));
                return (
                  <Link key={tab.href} href={tab.href} className={`portal-nav-link${active ? ' is-active' : ''}`} aria-current={active ? 'page' : undefined}>
                    <span>{tab.label}</span>
                    <span className="portal-nav-arrow">→</span>
                  </Link>
                );
              })}
            </nav>
            <div className="portal-sidebar-note">
              <h3>Quick links</h3>
              <div className="portal-nav">
                <Link href="/portal/login" className="portal-nav-link"><span>Login</span><span className="portal-nav-arrow">→</span></Link>
                <Link href="/portal/signup" className="portal-nav-link"><span>Create account</span><span className="portal-nav-arrow">→</span></Link>
              </div>
            </div>
          </aside>
          <div className="portal-content">{children}</div>
        </div>
      </div>
    </section>
  );
}
