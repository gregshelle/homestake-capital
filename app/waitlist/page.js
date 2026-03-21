import { PageHero } from '../../components/layout';
import { CTASection, WaitlistForm, TestimonialCard, TrustBadgeRow, UrgencyBanner, MarketStatCard } from '../../components/sections';
import { site } from '../../lib/site';

const marketStats = [
  { value: '$600B+', label: 'Market Opportunity', source: '' },
  { value: '200+', label: 'Prospective Investors', source: 'Already on the waitlist' },
  { value: 'Q2 2026', label: 'Target First Close', source: '' },
  { value: '50', label: 'Priority Spots Available', source: 'Limited cohort' },
];

export const metadata = {
  title: 'HomeStake Capital Waitlist | Follow the Launch Early',
  alternates: {
    canonical: `${site.url}/waitlist`
  },
  description:
    'Join the HomeStake Capital waitlist for launch updates, plain-English explainers, and early visibility into a community-first home services platform.',
};

export default function WaitlistPage() {
  return (
    <>
      <PageHero 
        eyebrow="Investor updates" 
        title="Get Priority Access to HomeStake Capital" 
        description="Join the priority waitlist for accredited-investor launch updates, exclusive insights, and early access to offering materials. Be part of the first cohort investing in the future of home services." 
      />
      
      {/* Urgency Banner */}
      <section className="section-tight">
        <div className="container">
          <UrgencyBanner 
            message="Only 50 Priority Spots for the First Close" 
            submessage="Join 200+ prospective investors already on the waitlist. Target first close: Q2 2026." 
          />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-tight">
        <div className="container">
          <TrustBadgeRow />
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <h2>Why Join the Priority Waitlist</h2>
            <ul className="list-clean">
              <li><strong>Early access to offering materials</strong> — Review PPM, subscription docs, and due diligence before public release</li>
              <li><strong>Investor education series</strong> — Learn the home services roll-up model, risk factors, and evaluation frameworks</li>
              <li><strong>Direct communication</strong> — Get updates from the founder, not marketing fluff</li>
              <li><strong>Priority allocation</strong> — First right of refusal on limited first-close capacity</li>
              <li><strong>Exclusive insights</strong> — See acquisition targets, operational plans, and market analysis</li>
            </ul>
            
            <div className="card" style={{ marginTop: 24, background: 'linear-gradient(135deg, rgba(176,138,71,0.1), rgba(65,85,72,0.1))' }}>
              <span className="eyebrow">Social Proof</span>
              <h3>Join 200+ Prospective Investors</h3>
              <p>Our early waitlist includes accredited investors, family offices, industry executives, and successful entrepreneurs who see the opportunity in home services consolidation.</p>
              <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span className="kicker">Technology Executives</span>
                <span className="kicker">Family Offices</span>
                <span className="kicker">Industry Professionals</span>
                <span className="kicker">Business Owners</span>
              </div>
            </div>
          </div>
          <WaitlistForm />
        </div>
      </section>

      {/* Stats Section */}
      <section className="section section-soft">
        <div className="container">
          <div className="grid-4">
            {marketStats.map((stat) => (
              <MarketStatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-3">
          {[
            ['Accredited investors','People who want to understand a model built around real operating businesses and a 506(c) raise posture.'],
            ['Business owners','Owners considering a future transition who want to follow the thesis and seller story.'],
            ['Partners and advisors','People interested in the category, model, and launch path.']
          ].map(([title, body]) => <div className="card" key={title}><h3>{title}</h3><p>{body}</p></div>)}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Early Momentum</span>
            <h2>What Waitlist Members Are Saying</h2>
          </div>
          <div className="grid-3">
            <TestimonialCard 
              quote="I've been looking for an operator-led investment in the trades. Most roll-ups are finance guys who don't understand the business. HomeStake is different."
              author="Waitlist Member"
              role="Accredited Investor"
            />
            <TestimonialCard 
              quote="The transparency commitment sold me. I've been burned by opaque PE funds before. This feels like a partnership, not a black box."
              author="Waitlist Member"
              role="Business Owner"
            />
            <TestimonialCard 
              quote="My advisor flagged the home services sector as high-opportunity. HomeStake's timing and team look right for this moment."
              author="Waitlist Member"
              role="Technology Executive"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card">
            <h2>Built for Clarity, Not Hype</h2>
            <p>HomeStake is intentionally taking a trust-first approach. That means clear communication, realistic framing, educational content before sales pressure, and plain-English explanation of what the company is and is not.</p>
            <p>We believe investors deserve to understand what they're investing in—not just a slick pitch deck.</p>
          </div>
          <div className="card">
            <h2>The Basic Idea</h2>
            <p>Private equity has already shown that home services can be a compelling category for acquisitions. HomeStake is exploring how to bring a more public-facing, community-first ownership story to that same category, while staying grounded in the realities of operations and compliance.</p>
            <p>The result: A platform that combines proven PE economics with modern transparency and investor access.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container">
          <div className="band reveal-up">
            <div>
              <h2 style={{ marginBottom: 10 }}>Don't Miss the First Close</h2>
              <p>Priority access is limited to the first 50 accredited investors. Join the waitlist today to secure your place.</p>
            </div>
            <div className="dual-cta">
              <a href="#waitlist-form" className="button button-primary">Join Priority Waitlist</a>
              <a href="/faq" className="button button-light">Read FAQ</a>
            </div>
          </div>
        </div>
      </section>

      <CTASection 
        title="Stay close to the build" 
        body="HomeStake Capital is preparing for Q2 2026 launch. Join the waitlist to follow every milestone from first acquisition to final close." 
        primary={{ href: '/how-it-works', label: 'See How It Works' }} 
        secondary={{ href: '/faq', label: 'Read the FAQ' }} 
      />
    </>
  );
}
