import { PageHero } from '../../components/layout';
import { CTASection, FAQList, WaitlistForm } from '../../components/sections';

const faqs = [
  { q: 'Can I invest right now?', a: 'Not through this website unless and until a live offering is formally available. Right now, the primary public action is joining the waitlist for updates and educational content.' },
  { q: 'Who is the current raise intended for?', a: 'The current planning posture is a Regulation D Rule 506(c) offering for accredited investors only. Public marketing may be used, but any investor accepted into the round would need to satisfy accredited-investor verification requirements.' },
  { q: 'Does HomeStake promise returns?', a: 'No. HomeStake should not promise returns, dividend levels, liquidity, or specific investment outcomes.' },
  { q: 'Why is the site careful with performance language?', a: 'Because trust matters and securities language matters. If a claim could be misunderstood as a promise, it should either be qualified carefully or left out until formal materials exist.' },
];

export const metadata = {
  title: 'For Investors | Invest in Home Service Businesses',
  description:
    'Explore HomeStake Capital\'s investor thesis, category focus, transparency promise, launch path, and waitlist for future updates.',
};

export default function InvestorsPage() {
  return (
    <>
      <PageHero eyebrow="For Investors" title="A Publicly Marketed Private Round for Accredited Investors" description="HomeStake Capital is preparing an accredited-investor-first raise under Rule 506(c), focused on acquiring and growing real home service businesses with a disciplined holdco model." primaryCta={{ href: '#waitlist-form', label: 'Request Updates' }} secondaryCta={{ href: '/faq', label: 'View FAQs' }} />
      <section className="section"><div className="container grid-2"><div><h2>Investor promise</h2><p>HomeStake is positioning an accredited-investor round around real operating businesses, not abstract software narratives or speculative financial engineering.</p><p>The company is combining a serious acquisition model with a clearer communication style, a disciplined holdco structure, and a more thoughtful story for business owners considering a transition.</p></div><div className="card"><h3>Why this category matters</h3><ul className="list-clean"><li>$600B+ category</li><li>Highly fragmented market</li><li>Private equity has already validated the roll-up model</li><li>Home services are essential and understandable</li></ul></div></div></section>
      <section className="section"><div className="container grid-3">{[['Why now','Private equity proved the economics. HomeStake is building a more transparent operator-led entry point for accredited investors.'],['Current access model','The current launch posture is a Regulation D Rule 506(c) accredited-investor round. Broader access concepts remain separate from this initial raise and should not be treated as live terms.'],['Return framework','The appeal is exposure to real operating businesses. Any future terms, distributions, or appreciation mechanics would need to appear in formal materials, not be inferred from this page.']].map(([title, body]) => <div className="card" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></section>
      <section className="section"><div className="container grid-2"><div className="card"><h2>Transparency promise</h2><ul className="list-clean"><li>Dashboard and reporting promise</li><li>Updates and documents</li><li>Plain-English explanations</li><li>Build visibility before launch</li></ul></div><div className="card"><h2>Risk and liquidity</h2><p>This is a long-term, illiquid investment opportunity, not a trading product.</p><p>Any future investment opportunity in a platform like this would likely need to be understood as long-term and potentially illiquid, subject to the structure and terms of the actual offering.</p></div></div></section>
      <section className="section"><div className="container grid-2"><div><h2>Regulatory path and launch timeline</h2><p>The current planning posture is a Regulation D Rule 506(c) raise for accredited investors only. Public marketing may be used, but investor verification, subscription review, and state notice filings remain legal workstreams.</p><p>HomeStake is currently in build mode. The current focus is on structure, compliance path, investor materials, and operating readiness.</p></div><div className="card"><h3>What happens next</h3><p>Request updates to receive launch materials, FAQ expansions, and milestone communication as the project develops.</p></div></div></section>
      <section className="section" id="waitlist-form"><div className="container grid-2"><div><h2>Request investor updates</h2><p>Use this form to follow the build, receive accredited-investor launch updates, and understand the model before any live subscription workflow exists.</p><p className="small">Any future offering would be made only through formal offering materials where permitted and after professional review.</p></div><WaitlistForm /></div></section>
      <section className="section"><div className="container"><h2>Common investor questions</h2><FAQList items={faqs} /></div></section>
      <CTASection title="Follow the launch" body="Be first to know when HomeStake shares major milestones, explainers, and next-step updates." primary={{ href: '#waitlist-form', label: 'Join the Waitlist' }} secondary={{ href: '/contact', label: 'Contact investor relations' }} />
    </>
  );
}
