'use client';

export default function Loading() {
  return (
    <div className="container section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          border: '3px solid var(--border)', 
          borderTopColor: 'var(--brass)', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite',
          margin: '0 auto 24px'
        }} />
        <p style={{ color: 'var(--muted)', margin: 0 }}>Loading...</p>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
