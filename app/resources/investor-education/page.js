import { PageHero } from '../../../components/layout';

export const metadata = {
  title: 'Investor Education | HomeStake Capital',
  alternates: {
    canonical: 'https://website-build-ivory.vercel.app/resources/investor-education'
  },
  description:
    'Investor education hub for HomeStake Capital covering the model, risks, and expected platform experience.',
};

export default function InvestorEducationPage() {
  return (
    <>
      <PageHero
        eyebrow="Investor education"
        title="Explain the Model Before Asking for Trust"
        description="This hub is where HomeStake can teach the market what the platform is, how it is intended to work, and what risks or limitations should be understood early."
      />
      <section className="section">
        <div className="container grid-3">
          {[
            ['How the model works', 'A high-level walk-through of capital formation, acquisitions, integration, and long-term value creation.'],
            ['Onboarding and eligibility', 'What registration, profile completion, disclosures, and manual review are meant to look like.'],
            ['Risk and liquidity', 'Why private-market investing should be treated as illiquid, long-term, and loss-capable.'],
          ].map(([title, body]) => (
            <div className="card" key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
