import { PageHero } from '../../components/layout';
import { CTASection, FounderCard, TestimonialCard, TrustBadgeRow } from '../../components/sections';

const founderInfo = {
  name: 'Greg Shelley',
  role: 'Founder & CEO',
  bio: 'Greg has spent over a decade building Custom Contracting Inc. in Brantford, Ontario — a full-service home services company installing HVAC systems, windows, doors, insulation, and eavestroughs across the GTA. He started in the trades, grew the business through operational discipline, and understands the day-to-day realities of running a service company. HomeStake was born from a simple observation: private equity has proven the home services model works, but no one is serving the middle market with the operator-first approach that owners actually need.',
  experience: [
    'Founded and scaled Custom Contracting Inc. in Brantford, Ontario over 10+ years',
    'Direct experience in HVAC, windows, doors, insulation, and exterior systems',
    'Serves homeowners across the Greater Toronto Area',
    'Deep understanding of operational challenges facing independent contractors',
    'Experience with seasonal demand, crew management, and customer acquisition'
  ],
  linkedin: 'https://www.linkedin.com/in/gregshelle/'
};

const teamInfo = [
  {
    name: 'Greg Shelley',
    role: 'Founder & CEO',
    bio: 'Based in Brantford, Ontario. Founded Custom Contracting Inc. and built it over 10+ years into a multi-trade home services business serving the GTA. Brings firsthand experience in HVAC, windows, doors, insulation, and exterior systems.',
    linkedin: 'https://www.linkedin.com/in/gregshelle/'
  }
];

export const metadata = {
  title: 'About HomeStake Capital | Mission, Model, and Team',
  description:
    'HomeStake Capital is an operator-led holding company focused on acquiring and improving home services businesses in Ontario. Learn about our investment thesis and approach.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero 
        eyebrow="About HomeStake Capital" 
        title="Operator-Led. Ontario-Focused. Built for the Middle Market." 
        description="HomeStake Capital exists because the home services market is fragmented, essential, and underserved by traditional private equity. We believe there's a better way to buy, operate, and grow these businesses — one that's hands-on, transparent, and grounded in the realities of running a trade." 
        primaryCta={{ href: '/waitlist', label: 'Get Priority Access' }} 
        secondaryCta={{ href: '/contact', label: 'Contact HomeStake' }} 
      />
      
      {/* Trust Badges */}
      <section className="section-tight">
        <div className="container">
          <TrustBadgeRow />
        </div>
      </section>

      {/* Why HomeStake Exists */}
      <section className="section">
        <div className="container grid-2">
          <div>
            <h2>Why HomeStake Exists</h2>
            <p>The home services market in North America is a $600B+ category. It's essential — homeowners always need heating, cooling, plumbing, and repairs. It's fragmented — 89% of companies have fewer than 10 employees. And it's proven — private equity has spent years validating the roll-up model.</p>
            <p>But here's the problem: traditional PE firms aren't built to serve the middle market properly. They move too fast, centralize too aggressively, and treat owners like transactions instead of partners. The result is a lot of broken promises and poorly run businesses.</p>
            <p>HomeStake was built to fill that gap. We focus on Ontario-based home services companies in the $1M–$10M revenue range — the size most PE firms ignore or mishandle. We bring an operator-led, hands-on approach that respects what owners have built while improving operations for the long term.</p>
          </div>
          <div className="card">
            <h3>What HomeStake Is</h3>
            <p>HomeStake is an acquisition and operating platform focused on home services businesses in Ontario. The model is straightforward:</p>
            <ul className="list-clean">
              <li>Acquire strong local businesses with durable demand</li>
              <li>Support them with shared services and better systems</li>
              <li>Improve operations through hands-on involvement</li>
              <li>Build long-term value without breaking what works</li>
            </ul>
            <p>This is not a passive investment vehicle. The operating model matters as much as the capital.</p>
          </div>
        </div>
      </section>

      {/* Greg's Story / Founder Section */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Leadership</span>
            <h2>Meet the Founder</h2>
            <p>HomeStake is led by operators who have built real businesses, not just financial models.</p>
          </div>
          <div className="grid-2">
            <FounderCard {...founderInfo} />
            <div className="card">
              <span className="eyebrow">Greg's Story</span>
              <h3>From the Trades to the Buy Side</h3>
              <p>Greg started Custom Contracting Inc. in Brantford, Ontario over a decade ago. He began with hands-on work in HVAC, windows, and doors — learning the business from the ground up. Over time, he built a multi-trade operation serving homeowners across the GTA.</p>
              <p>The experience gave him a clear view of what works and what doesn't in home services. He saw how hard it is to find good technicians, manage seasonal demand, and build systems that scale. He also saw how private equity buyers often misunderstand these businesses, treating them like spreadsheets instead of operations that require real expertise.</p>
              <p>HomeStake is the result: a holding company that combines the discipline of private equity with the practical knowledge of someone who's actually run the businesses he's buying.</p>
              <div style={{ marginTop: 20 }}>
                <a 
                  href="https://www.linkedin.com/in/gregshelle/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="button button-light"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Thesis */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Investment Thesis</span>
            <h2>Why Home Services. Why Now. Why Ontario.</h2>
          </div>
          <div className="grid-3">
            <div className="card">
              <h3>Why Home Services</h3>
              <p>Home services are non-discretionary. People need heat, cooling, plumbing, and electricity regardless of economic cycles. The businesses are essential, the demand is recurring, and the unit economics are proven. Yet the industry remains dominated by small, locally-owned operators who lack access to capital, technology, and modern management practices.</p>
            </div>
            <div className="card">
              <h3>Why Now</h3>
              <p>Private equity has validated the roll-up model in this category, but they've also created a gap. By focusing on larger transactions and aggressive centralization, they've left the middle market underserved — and created skepticism among owners who've seen peers burned by bad buyers. The opportunity is for an operator-led approach that treats sellers as partners, not counterparties.</p>
            </div>
            <div className="card">
              <h3>Why Ontario</h3>
              <p>Ontario's housing stock is aging, the population is growing, and the climate demands year-round HVAC work. The province has a strong trades culture and a fragmented market of independent operators. It's a market Greg knows intimately — and one where local reputation, relationships, and operational excellence matter more than financial engineering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Our Approach</span>
            <h2>Operator-Led. Hands-On. Community-First.</h2>
          </div>
          <div className="grid-2">
            <div className="card">
              <h3>Built by Operators, For Owners</h3>
              <p>Traditional private equity firms are run by financiers who analyze businesses from spreadsheets. HomeStake is different — our leadership has actually run service businesses, managed installation crews, and solved the day-to-day operational challenges that create real value.</p>
              <p>This operator-led model provides several advantages:</p>
              <ul className="list-clean">
                <li><strong>Credibility in seller conversations:</strong> We speak the language of contractors because we are contractors.</li>
                <li><strong>Realistic operational improvements:</strong> We know what actually moves the needle in field service operations.</li>
                <li><strong>Team retention:</strong> We understand what skilled tradespeople value in an employer.</li>
                <li><strong>Investor alignment:</strong> Our interests are tied to operational performance, not just deal fees.</li>
              </ul>
            </div>
            <div className="card">
              <h3>Hands-On, Not Hands-Off</h3>
              <p>We're not financial engineers looking to flip assets. We're operators who believe the best way to grow these businesses is to get involved — improve the systems, support the teams, and build on what's already working.</p>
              <p>That means:</p>
              <ul className="list-clean">
                <li>Shared back-office services (finance, marketing, technology)</li>
                <li>Operational support and best practices</li>
                <li>Respect for local brand equity and customer relationships</li>
                <li>Structured transitions that protect what sellers have built</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Team</span>
            <h2>Who We Are</h2>
            <p>HomeStake is building a team of operators, advisors, and partners who understand the home services industry.</p>
          </div>
          <div className="grid-2">
            {teamInfo.map((member) => (
              <div className="card founder-card" key={member.name}>
                <div className="founder-avatar">
                  <div className="founder-avatar-placeholder">{member.name.split(' ').map(n => n[0]).join('')}</div>
                </div>
                <div className="founder-info">
                  <h3>{member.name}</h3>
                  <span className="founder-role">{member.role}</span>
                  <p>{member.bio}</p>
                  <div style={{ marginTop: 12 }}>
                    <a 
                      href={member.linkedin}
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)', textDecoration: 'none' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: 32, textAlign: 'center' }}>
            <p><strong>We're growing.</strong> HomeStake is actively building out its team of operating partners, advisors, and principals. As the firm scales and closes its first acquisitions, additional team members will be listed here.</p>
            <p className="small" style={{ marginTop: 12 }}>Interested in joining? <a href="/contact">Get in touch</a>.</p>
          </div>
        </div>
      </section>

      {/* Industry Recognition */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Industry Recognition</span>
            <h2>Affiliations & Associations</h2>
            <p>HomeStake and its operating companies maintain relationships with industry organizations that matter in the home services sector.</p>
          </div>
          <div className="grid-3">
            {[
              ['HVAC Excellence', 'Industry training and certification standards for heating, ventilation, and air conditioning professionals.'],
              ['Canadian Home Builders Association', 'National association representing residential construction and renovation industry in Canada.'],
              ['Ontario General Contractors Association', 'Provincial association serving general contractors and construction professionals across Ontario.']
            ].map(([name, desc]) => (
              <div className="card" key={name}>
                <h3>{name}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What HomeStake Is Not */}
      <section className="section">
        <div className="container card">
          <h2>What HomeStake Is Not</h2>
          <ul className="list-clean">
            <li>Not a hype-driven finance brand</li>
            <li>Not a promise of easy or guaranteed returns</li>
            <li>Not anti-business or anti-scale</li>
            <li>Not a generic roll-up story with softer packaging</li>
            <li>Not a live offering unless and until formal materials say so</li>
          </ul>
        </div>
      </section>

      <CTASection 
        title="If the thesis makes sense to you, stay close to the build" 
        body="Join the priority waitlist for launch updates and plain-English explainers, or reach out if you are a business owner, partner, or advisor who sees a fit." 
        primary={{ href: '/waitlist', label: 'Get Priority Access' }} 
        secondary={{ href: '/contact', label: 'Contact HomeStake' }} 
      />
    </>
  );
}
