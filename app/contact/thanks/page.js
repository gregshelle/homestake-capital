import Link from 'next/link';

export const metadata = {
  title: 'Inquiry Received | HomeStake Capital',
};

export default function ContactThanksPage() {
  return (
    <section className="section">
      <div className="container grid-2">
        <div className="card">
          <span className="eyebrow">Contact</span>
          <h1>Inquiry received</h1>
          <p>
            This confirmation route gives the public contact flow a complete shape for future form handling,
            CRM routing, and response expectations.
          </p>
        </div>
        <div className="card">
          <h2>Helpful next steps</h2>
          <div className="dual-cta">
            <Link href="/for-investors" className="button button-primary">For investors</Link>
            <Link href="/for-business-owners" className="button button-light">For business owners</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
