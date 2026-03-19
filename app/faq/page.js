import { PageHero } from '../../components/layout';
import { CTASection, FAQAccordion } from '../../components/sections';

const faqCategories = [
  {
    category: 'About HomeStake',
    items: [
      { q: 'What is HomeStake Capital?', a: 'HomeStake Capital is building a platform focused on acquiring, operating, and growing essential home service businesses. The company is positioned as a community-first alternative to traditional private equity in this category, with a strong emphasis on operational discipline and plain-English communication.' },
      { q: 'What kinds of businesses does HomeStake focus on?', a: 'The current focus is on essential home service categories such as HVAC, plumbing, electrical, roofing, landscaping, pest control, and related trades.' },
      { q: 'Why home services?', a: 'Home services are understandable, essential, and still highly fragmented. Many businesses in the category are locally built, reputation-driven, and operationally improvable, which makes the space attractive for disciplined acquisitions.' },
    ]
  },
  {
    category: 'Investment',
    items: [
      { q: 'Can I invest right now?', a: 'Not through this website unless and until a live offering is formally available. Right now, the primary public action is requesting updates and educational content.' },
      { q: 'Who is the planned initial raise for?', a: 'The current planning posture is a Regulation D Rule 506(c) offering for accredited investors only. Public marketing may be used, but every purchaser would need to satisfy accredited-investor verification requirements before acceptance.' },
      { q: 'What is the waitlist for?', a: 'The waitlist is designed to help people follow the build, get launch updates, and understand the model before any live offering or onboarding experience exists.' },
      { q: 'Does HomeStake promise returns?', a: 'No. HomeStake should not promise returns, dividend levels, liquidity, or specific investment outcomes.' },
      { q: 'What are the main risks?', a: 'The broad categories include execution risk, acquisition risk, financing risk, integration risk, regulatory risk, illiquidity risk, and the risk that a specific market or company underperforms expectations.' },
    ]
  },
  {
    category: 'Business Model',
    items: [
      { q: 'How does HomeStake plan to create value?', a: 'At a high level, through disciplined acquisitions, stronger reporting, better systems, shared services, and portfolio-level operational improvement over time.' },
      { q: 'What does hub-and-spoke mean?', a: 'It means building around a strong platform company in a market and then adding density, talent, or adjacent capabilities through smaller tuck-in acquisitions over time.' },
    ]
  },
  {
    category: 'For Business Owners',
    items: [
      { q: 'Why would a business owner talk to HomeStake?', a: 'Because many owners want more than price alone. They care about continuity, employees, customers, reputation, and whether a buyer actually understands the category.' },
      { q: 'Can I stay involved after a sale?', a: 'Possibly. In some situations, founder involvement during transition may be useful. The answer depends on the company, the team, the transaction structure, and what creates the best long-term outcome.' },
      { q: 'Is the process confidential?', a: 'Early seller conversations are intended to be handled discreetly and respectfully. Owners should still avoid sending highly sensitive information through a general website form before fit and process are established.' },
    ]
  }
];

// Flatten for schema
const allItems = faqCategories.flatMap(cat => cat.items);

export const metadata = {
  title: 'HomeStake Capital FAQ',
  description: 'Answers to investor, seller, and category questions about HomeStake Capital.',
};

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero 
        eyebrow="FAQ" 
        title="Questions People Should Ask" 
        description="HomeStake combines multiple ideas people do not usually see together: home services, acquisitions, private-market access, community ownership, and seller-friendly positioning. This FAQ is organized by topic to help you find answers quickly." 
        primaryCta={{ href: '/waitlist', label: 'Join the Waitlist' }} 
        secondaryCta={{ href: '/contact', label: 'Contact HomeStake' }} 
      />
      
      <section className="section">
        <div className="container">
          <div className="notice" style={{ marginBottom: 32 }}>
            This website is for general informational purposes. Any future offering would be made only through formal offering materials where permitted and after professional review.
          </div>
          
          {faqCategories.map((category) => (
            <FAQAccordion 
              key={category.category} 
              category={category.category} 
              items={category.items} 
            />
          ))}
        </div>
      </section>
      
      <CTASection 
        title="Still have questions?" 
        body="If you are a future investor, join the waitlist. If you are a business owner, start a confidential conversation. If you are a partner, advisor, or member of the media, use the contact page." 
        primary={{ href: '/waitlist', label: 'Join the Waitlist' }} 
        secondary={{ href: '/for-business-owners', label: 'Start a Confidential Conversation' }} 
      />
    </>
  );
}
