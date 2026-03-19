'use client';

import Link from 'next/link';

export default function PortalError({ error, reset }) {
  return (
    <div className="portal-stack">
      <div className="card portal-hero-card" style={{ textAlign: 'center' }}>
        <span className="eyebrow">Error</span>
        <h2>Something went wrong</h2>
        <p>
          {error?.message || 'An unexpected error occurred in the portal. Please try again.'}
        </p>
        <div className="dual-cta" style={{ justifyContent: 'center' }}>
          <button onClick={reset} className="button button-primary">
            Try again
          </button>
          <Link href="/portal" className="button button-light">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
