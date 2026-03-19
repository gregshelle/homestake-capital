import { PageHero } from '../../components/layout';
import { CTASection, WaitlistForm } from '../../components/sections';

export const metadata = {
  title: 'HomeStake Capital Waitlist | Follow the Launch Early',
  description:
    'Join the HomeStake Capital waitlist for launch updates, plain-English explainers, and early visibility into a community-first home services platform.',
};

export default function WaitlistPage() {
  return (
    <>
      <PageHero eyebrow="Investor updates" title="Follow the Accredited-Investor Launch Early" description="Join the HomeStake Capital list to get launch updates, plain-English explainers, and early visibility into how the accredited-investor-first model is being built." />
      <section className="section"><div className="container grid-2"><div><h2>Why Join the Waitlist</h2><ul className="list-clean"><li>Get early updates as HomeStake develops</li><li>Learn how the model works in plain English</li><li>Follow milestones, FAQs, and launch progress</li><li>Stay close to the build before public launch</li></ul><div className="card" style={{ marginTop: 24 }}><h3>What HomeStake Is Building</h3><p>HomeStake Capital is building a community-first holding company focused on acquiring and growing essential home service businesses. The platform is being designed to combine disciplined operations with a more open and transparent ownership story.</p></div></div><WaitlistForm /></div></section>
      <section className="section"><div className="container grid-3">{[['Accredited investors','People who want to understand a model built around real operating businesses and a 506(c) raise posture.'],['Business owners','Owners considering a future transition who want to follow the thesis and seller story.'],['Partners and advisors','People interested in the category, model, and launch path.']].map(([title, body]) => <div className="card" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></section>
      <section className="section"><div className="container grid-2"><div className="card"><h2>Built for clarity, not hype</h2><p>HomeStake is intentionally taking a trust-first approach. That means clear communication, realistic framing, educational content before sales pressure, and plain-English explanation of what the company is and is not.</p></div><div className="card"><h2>The basic idea</h2><p>Private equity has already shown that home services can be a compelling category for acquisitions. HomeStake is exploring how to bring a more public-facing, community-first ownership story to that same category, while staying grounded in the realities of operations and compliance.</p></div></div></section>
      <CTASection title="Stay close to the build" body="HomeStake Capital is in build mode. Website content is for general informational purposes and should not be treated as an offer to sell or a solicitation to buy securities." primary={{ href: '/how-it-works', label: 'See How It Works' }} secondary={{ href: '/faq', label: 'Read the FAQ' }} />
    </>
  );
}
