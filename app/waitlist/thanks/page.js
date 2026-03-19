import Link from 'next/link';

export const metadata = {
  title: 'Waitlist Confirmation | HomeStake Capital',
};

export default function WaitlistThanksPage() {
  return (
    <section className="section">
      <div className="container grid-2">
        <div className="card">
          <span className="eyebrow">Waitlist</span>
          <h1>You&apos;re on the list</h1>
          <p>
            This confirmation page is included so the future live waitlist flow has a clean post-submit
            destination for onboarding education, referral logic, and next-step routing.
          </p>
        </div>
        <div className="card">
          <h2>What to do next</h2>
          <div className="dual-cta">
            <Link href="/how-it-works" className="button button-primary">See how it works</Link>
            <Link href="/faq" className="button button-light">Read the FAQ</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
