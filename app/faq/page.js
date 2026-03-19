import { PageHero } from '../../components/layout';
import { CTASection, FAQList } from '../../components/sections';

const items = [
  ['What is HomeStake Capital?','HomeStake Capital is building a platform focused on acquiring, operating, and growing essential home service businesses. The company is positioned as a community-first alternative to traditional private equity in this category, with a strong emphasis on operational discipline and plain-English communication.'],
  ['What kinds of businesses does HomeStake focus on?','The current focus is on essential home service categories such as HVAC, plumbing, electrical, roofing, landscaping, pest control, and related trades.'],
  ['Why home services?','Home services are understandable, essential, and still highly fragmented. Many businesses in the category are locally built, reputation-driven, and operationally improvable, which makes the space attractive for disciplined acquisitions.'],
  ['Can I invest right now?','Not through this website unless and until a live offering is formally available. Right now, the primary public action is requesting updates and educational content.'],
  ['Who is the planned initial raise for?','The current planning posture is a Regulation D Rule 506(c) offering for accredited investors only. Public marketing may be used, but every purchaser would need to satisfy accredited-investor verification requirements before acceptance.'],
  ['What is the waitlist for?','The waitlist is designed to help people follow the build, get launch updates, and understand the model before any live offering or onboarding experience exists.'],
  ['Does HomeStake promise returns?','No. HomeStake should not promise returns, dividend levels, liquidity, or specific investment outcomes.'],
  ['What are the main risks?','The broad categories include execution risk, acquisition risk, financing risk, integration risk, regulatory risk, illiquidity risk, and the risk that a specific market or company underperforms expectations.'],
  ['How does HomeStake plan to create value?','At a high level, through disciplined acquisitions, stronger reporting, better systems, shared services, and portfolio-level operational improvement over time.'],
  ['What does hub-and-spoke mean?','It means building around a strong platform company in a market and then adding density, talent, or adjacent capabilities through smaller tuck-in acquisitions over time.'],
  ['Why would a business owner talk to HomeStake?','Because many owners want more than price alone. They care about continuity, employees, customers, reputation, and whether a buyer actually understands the category.'],
  ['Can I stay involved after a sale?','Possibly. In some situations, founder involvement during transition may be useful. The answer depends on the company, the team, the transaction structure, and what creates the best long-term outcome.'],
  ['Is the process confidential?','Early seller conversations are intended to be handled discreetly and respectfully. Owners should still avoid sending highly sensitive information through a general website form before fit and process are established.'],
];

export const metadata = {
  title: 'HomeStake Capital FAQ',
  description: 'Answers to investor, seller, and category questions about HomeStake Capital.',
};

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero eyebrow="FAQ" title="Questions People Should Ask" description="HomeStake combines multiple ideas people do not usually see together: home services, acquisitions, private-market access, community ownership, and seller-friendly positioning. This FAQ is written to answer them plainly." primaryCta={{ href: '/waitlist', label: 'Join the Waitlist' }} secondaryCta={{ href: '/contact', label: 'Contact HomeStake' }} />
      <section className="section"><div className="container"><div className="notice">This website is for general informational purposes. Any future offering would be made only through formal offering materials where permitted and after professional review.</div><div style={{ marginTop: 24 }}><FAQList items={items.map(([q, a]) => ({ q, a }))} /></div></div></section>
      <CTASection title="Still have questions?" body="If you are a future investor, join the waitlist. If you are a business owner, start a confidential conversation. If you are a partner, advisor, or member of the media, use the contact page." primary={{ href: '/waitlist', label: 'Join the Waitlist' }} secondary={{ href: '/for-business-owners', label: 'Start a Confidential Conversation' }} />
    </>
  );
}
