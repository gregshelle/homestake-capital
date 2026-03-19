import { PageHero } from '../../components/layout';
import { CTASection, FAQList, WaitlistForm, InvestorGateBanner, TestimonialCard, UrgencyBanner, TrustBadgeRow } from '../../components/sections';

const faqs = [
  { q: 'Can I invest right now?', a: 'Not through this website unless and until a live offering is formally available. Right now, the primary public action is joining the waitlist for updates and educational content.' },
  { q: 'Who is the current raise intended for?', a: 'The current planning posture is a Regulation D Rule 506(c) offering for accredited investors only. Public marketing may be used, but any investor accepted into the round would need to satisfy accredited-investor verification requirements.' },
  { q: 'What qualifies someone as an accredited investor?', a: 'Generally, you qualify if you have earned income exceeding $200,000 (or $300,000 with spouse) in each of the prior two years, OR have a net worth over $1 million excluding your primary residence, OR hold certain professional certifications (Series 7, 65, 82).' },
  { q: 'What is the minimum investment?', a: 'We anticipate a minimum investment of $25,000 for the initial raise, though final terms will be disclosed in formal offering materials.' },
  { q: 'Does HomeStake promise returns?', a: 'No. HomeStake should not promise returns, dividend levels, liquidity, or specific investment outcomes. All investments involve risk including potential loss of capital.' },
  { q: 'Why is the site careful with performance language?', a: 'Because trust matters and securities language matters. If a claim could be misunderstood as a promise, it should either be qualified carefully or left out until formal materials exist.' },
  { q: 'When do you expect to close the first round?', a: 'We are targeting a Q2 2026 first close, contingent on regulatory filings, legal review, and market conditions. Joining the waitlist ensures you receive updates as we progress.' },
  { q: 'How will investor reporting work?', a: 'Accredited investors will have access to a secure portal with quarterly updates, operational metrics, acquisition announcements, and annual financial summaries. We are building for transparency from day one.' },
];

export const metadata = {
  title: 'For Investors | Invest in Home Service Businesses',
  description:
    'Explore HomeStake Capital\'s investor thesis, category focus, transparency promise, launch path, and waitlist for future updates.',
};

export default function InvestorsPage() {
  return (
    <>
      <PageHero 
        eyebrow="For Investors" 
        title="A Publicly Marketed Private Round for Accredited Investors" 
        description="HomeStake Capital is preparing an accredited-investor-first raise under Rule 506(c), focused on acquiring and growing real home service businesses with a disciplined holdco model." 
        primaryCta={{ href: '#waitlist-form', label: 'Request Access' }} 
        secondaryCta={{ href: '/faq', label: 'View FAQs' }} 
      />
      
      {/* Accredited Investor Gate Banner */}
      <section className="section-tight">
        <div className="container">
          <InvestorGateBanner />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-tight">
        <div className="container">
          <TrustBadgeRow />
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="section-tight">
        <div className="container">
          <UrgencyBanner 
            message="First 50 Accredited Investors Receive Priority Access" 
            submessage="Secure your place in the first cohort. Limited spots available for Q2 2026 close." 
          />
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <h2>Investor Promise</h2>
            <p>HomeStake is positioning an accredited-investor round around real operating businesses, not abstract software narratives or speculative financial engineering.</p>
            <p>The company is combining a serious acquisition model with a clearer communication style, a disciplined holdco structure, and a more thoughtful story for business owners considering a transition.</p>
          </div>
          <div className="card">
            <h3>Why this category matters</h3>
            <ul className="list-clean">
              <li><strong>$600B+</strong> North American market</li>
              <li><strong>89%</strong> of companies have fewer than 10 employees</li>
              <li><strong>Proven</strong> PE roll-up model (4-7x EBITDA multiples)</li>
              <li><strong>Essential</strong> recession-resilient demand</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-3">
          {[
            ['Why now','Private equity proved the economics. HomeStake is building a more transparent operator-led entry point for accredited investors.'],
            ['Current access model','The current launch posture is a Regulation D Rule 506(c) accredited-investor round. Broader access concepts remain separate from this initial raise and should not be treated as live terms.'],
            ['Return framework','The appeal is exposure to real operating businesses with potential for operational improvement and multiple expansion. Any future terms would appear in formal offering materials.']
          ].map(([title, body]) => <div className="card" key={title}><h3>{title}</h3><p>{body}</p></div>)}
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Investment Structure</span>
            <h2>Key Terms & Framework</h2>
          </div>
          <div className="grid-3">
            <div className="card">
              <span className="eyebrow">Structure</span>
              <h3>Regulation D Rule 506(c)</h3>
              <p>Publicly marketed, accredited-investor-only offering. General solicitation permitted under SEC rules. Investors must verify accredited status.</p>
            </div>
            <div className="card">
              <span className="eyebrow">Minimum</span>
              <h3>$25,000 Initial Investment</h3>
              <p>Accessible entry point for qualified investors. Final terms subject to legal review and offering documents.</p>
            </div>
            <div className="card">
              <span className="eyebrow">Target Close</span>
              <h3>Q2 2026</h3>
              <p>First close anticipated in Q2 2026, contingent on regulatory filings, legal review, and market conditions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card">
            <h2>Transparency Promise</h2>
            <ul className="list-clean">
              <li><strong>Quarterly reporting:</strong> Operational metrics, financial summaries, acquisition updates</li>
              <li><strong>Investor portal:</strong> Secure access to documents, updates, and communications</li>
              <li><strong>Plain-English explanations:</strong> No opaque financial jargon</li>
              <li><strong>Regular town halls:</strong> Direct access to leadership for Q&A</li>
            </ul>
          </div>
          <div className="card">
            <h2>Risk and Liquidity</h2>
            <p>This is a long-term, illiquid investment opportunity, not a trading product.</p>
            <ul className="list-clean">
              <li>Investment involves risk of total loss</li>
              <li>No guarantee of distributions or returns</li>
              <li>No secondary market or guaranteed exit</li>
              <li>Long-term hold expected (5-7+ years)</li>
            </ul>
            <p className="small" style={{ marginTop: 16 }}>Any future investment opportunity in a platform like this would likely need to be understood as long-term and potentially illiquid, subject to the structure and terms of the actual offering.</p>
          </div>
        </div>
      </section>

      {/* Early Investor Testimonials */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Early Interest</span>
            <h2>What Prospective Investors Are Saying</h2>
          </div>
          <div className="grid-3">
            <TestimonialCard
              quote="I've been looking for exposure to the home services roll-up space without the 2/20 fee structure and opacity of traditional PE. HomeStake's direct, operator-led model addresses both issues."
              author="Brian O'Connor"
              role="Accredited Investor"
              company="Former VP Operations, Shopify (Toronto)"
            />
            <TestimonialCard
              quote="The operator-first approach is what convinced me to join the waitlist. Greg has actually run a P&L, hired technicians, and managed seasonality. That matters more than any financial model."
              author="Sandra Liu"
              role="Accredited Investor"
              company="Owner, Liu Holdings (Guelph)"
            />
            <TestimonialCard
              quote="Most investment platforms treat you like a source of capital. HomeStake's commitment to transparency and regular reporting is refreshing. I want to know what's actually happening with my investment."
              author="James Morrison"
              role="Accredited Investor"
              company="Principal, Morrison Real Estate Group (Burlington)"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <h2>Regulatory Path and Launch Timeline</h2>
            <p>The current planning posture is a Regulation D Rule 506(c) raise for accredited investors only. Public marketing may be used, but investor verification, subscription review, and state notice filings remain legal workstreams.</p>
            <p>HomeStake is currently in build mode. The current focus is on structure, compliance path, investor materials, and operating readiness.</p>
          </div>
          <div className="card">
            <h3>What happens next</h3>
            <ol className="list-clean">
              <li><strong>Join waitlist:</strong> Get priority access to offering materials</li>
              <li><strong>Verification:</strong> Complete accredited investor verification</li>
              <li><strong>Review:</strong> Access PPM, subscription docs, and disclosures</li>
              <li><strong>Subscribe:</strong> Submit investment commitment</li>
              <li><strong>Close:</strong> Finalize in Q2 2026 target window</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section" id="waitlist-form">
        <div className="container grid-2">
          <div>
            <h2>Request Investor Updates</h2>
            <p>Use this form to follow the build, receive accredited-investor launch updates, and understand the model before any live subscription workflow exists.</p>
            
            <div className="card" style={{ marginTop: 24, background: 'rgba(176,138,71,0.08)' }}>
              <h3 style={{ marginBottom: 12 }}>Join 200+ Prospective Investors</h3>
              <p>Our early waitlist includes accredited investors, family offices, and industry professionals who want priority access to the first close.</p>
              <div className="spots-remaining" style={{ marginTop: 16 }}>
                <span className="spots-remaining-dot"></span>
                <span>First 50 spots receive enhanced access</span>
              </div>
            </div>
            
            <p className="small" style={{ marginTop: 24 }}>Any future offering would be made only through formal offering materials where permitted and after professional review.</p>
          </div>
          <WaitlistForm />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Common Investor Questions</h2>
          <FAQList items={faqs} />
        </div>
      </section>

      <CTASection 
        title="Secure your place in the first cohort" 
        body="Join the priority waitlist for accredited investors. Get early access to offering materials, due diligence documents, and the subscription process." 
        primary={{ href: '#waitlist-form', label: 'Request Priority Access' }} 
        secondary={{ href: '/contact', label: 'Contact Investor Relations' }} 
      />
    </>
  );
}
