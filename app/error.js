'use client';

import Link from 'next/link';

export default function Error({ error, reset }) {
  return (
    <div className="container section">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2>Something went wrong</h2>
        <p style={{ color: 'var(--muted)' }}>
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="dual-cta" style={{ justifyContent: 'center' }}>
          <button onClick={reset} className="button button-primary">
            Try again
          </button>
          <Link href="/" className="button button-light">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
