import Link from 'next/link';
import { site, organizationSchema } from '../lib/site';

export function Header() {
  return (
    <header className="topbar">
      <div className="container nav">
        <Link href="/" className="brand" aria-label="HomeStake Capital home">
          <span className="brand-mark">HomeStake Capital</span>
          <span className="brand-sub">The public&apos;s private equity for home services</span>
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
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <div className="container grid-3">
        <div>
          <div className="brand-mark">HomeStake Capital</div>
          <p className="small" style={{ marginTop: 12 }}>
            HomeStake Capital is building a community-first holding company focused on acquiring and growing home service businesses, while offering a more open and transparent ownership model than traditional private equity.
          </p>
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
