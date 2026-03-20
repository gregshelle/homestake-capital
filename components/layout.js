'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { site, organizationSchema } from '../lib/site';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Skip navigation link */}
      <a href="#main" className="skip-nav">Skip to main content</a>

      <header className="topbar">
        <div className="container nav">
          <Link href="/"
              className="brand" aria-label="HomeStake Capital home">
            <img
              src="/homestake-final-logo.png"
              alt="HomeStake Capital"
              className="brand-logo desktop"
              style={{ height: "64px", width: "auto" }}
            />
          </Link>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="actions">
            <Link href="/waitlist" className="button button-primary">Join the Waitlist</Link>
            <Link href="/for-business-owners" className="button button-light">Sell Your Business</Link>
          </div>

          {/* Hamburger button — visible on mobile only */}
          <button
            className="hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div id="mobile-menu" className="mobile-menu" role="dialog" aria-label="Mobile navigation">
            <nav aria-label="Mobile navigation">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mobile-menu-actions">
              <Link href="/waitlist" className="button button-primary" onClick={() => setMenuOpen(false)}>Join the Waitlist</Link>
              <Link href="/for-business-owners" className="button button-light" onClick={() => setMenuOpen(false)}>Sell Your Business</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <div className="container grid-3">
        <div>
          <Image 
            src="/homestake-final-logo.png" 
            alt="HomeStake Capital" 
            width={180} 
            height={240}
            className="footer-logo"
          />
          <p className="small" style={{ marginTop: 12 }}>
            HomeStake Capital is building a community-first holding company focused on acquiring and growing home service businesses across North America, while offering a more open and transparent ownership model than traditional private equity.
          </p>
          {/* Visible contact information */}
          <div className="footer-contact">
            <p className="small"><strong>Contact</strong></p>
            <p className="small">
              <a href="mailto:invest@homestakecapital.com">invest@homestakecapital.com</a>
            </p>
            <p className="small">
              <a href="tel:+12897688694">289-768-8694</a>
            </p>
            <p className="small">Brantford, Ontario, Canada</p>
            <p className="small" style={{ marginTop: 8 }}>
              <a 
                href="https://www.linkedin.com/in/gregshelle/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </p>
          </div>
        </div>
        <div>
          <h3>Explore</h3>
          <div className="grid-2" style={{ gap: 10 }}>
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h3>Important notes</h3>
          <p className="small">
            Website information is for general informational purposes. Any future offering would be made only through formal offering materials where permitted.
          </p>
          <div className="grid-2" style={{ gap: 10, marginTop: 14 }}>
            {site.legal.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, description, primaryCta, secondaryCta }) {
  return (
    <section className="page-hero page-hero-rich">
      <div className="page-hero-backdrop" />
      <div className="container section-heading reveal-up">
        <span className="eyebrow">{eyebrow}</span>
        <h1 style={{ maxWidth: 980 }}>{title}</h1>
        <p style={{ maxWidth: 760 }}>{description}</p>
        {(primaryCta || secondaryCta) && (
          <div className="dual-cta">
            {primaryCta ? <Link href={primaryCta.href} className="button button-primary">{primaryCta.label}</Link> : null}
            {secondaryCta ? <Link href={secondaryCta.href} className="button button-light">{secondaryCta.label}</Link> : null}
          </div>
        )}
      </div>
    </section>
  );
}
