import Link from 'next/link';
import { ScrollReveal } from '../components/scroll-reveal';
import { CTASection, SectionHeader, WaitlistForm, TestimonialCard, TrustBadgeRow, MarketStatCard, PortfolioTeaser, FounderCard } from '../components/sections';
import { AmbientImageCard, GrowthChartCard, TimelineChartCard } from '../components/visuals';

// LocalBusiness Schema
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "HomeStake Capital",
  "description": "Business acquisition private equity for home service companies",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Brantford",
    "addressRegion": "Ontario",
    "addressCountry": "CA"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Ontario/GTA"
  },
  "serviceType": "Business acquisition private equity"
};

const stats = [
  ['$600B+ category', 'North American home services represent a massive essential-services market.'],
  ['Highly fragmented', '89% of companies have fewer than 10 employees. Most remain locally owned and operationally improvable.'],
  ['Private equity validated', 'Sophisticated buyers have already proven the roll-up thesis in this category.'],
  ['Built for long-term value', 'HomeStake is being designed around acquisitions, operations, and reporting, not just a launch narrative.'],
];

const transparency = ['Launch updates and milestones', 'Portfolio and acquisition visibility', 'Documents and disclosures', 'Ongoing communication designed to be understandable'];

const marketStats = [
  { value: '$600B+', label: 'North American Home Services Market', source: 'IBISWorld 2024' },
  { value: '3.4%', label: 'Annual Growth Rate (CAGR 2024-2030)', source: 'Grand View Research' },
  { value: '89%', label: 'Companies with <10 Employees', source: 'U.S. Census Bureau / Statistics Canada' },
  { value: '4-7x', label: 'HVAC Roll-up EBITDA Multiples', source: 'Middle Market M&A' },
];

const founderInfo = {
  name: 'Greg Shelley',
  role: 'Founder & Managing Partner',
  bio: 'Greg has spent over a decade building Custom Contracting Inc. in Brantford, Ontario. The company installs HVAC systems, windows, doors, insulation, and eavestroughs across the GTA. He started in the trades, grew the business through operational discipline, and now wants to bring that same approach to acquiring and improving other home services companies.',
  experience: [
    '10+ years building Custom Contracting Inc. from the ground up',
    'Direct experience in HVAC, windows, doors, insulation, and exterior systems',
    'Serves homeowners across Brantford and the Greater Toronto Area',
    'Deep understanding of the operational challenges facing independent contractors'
  ]
};

export default function HomePage() {
  return (
    <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <>
      {/* Trust Banner - Urgency/Scarcity */}
      <div style={{ background: 'linear-gradient(135deg, #1b2833, #16212b)', padding: '12px 0' }}>
        <div className="container">
          <div className="urgency-banner" style={{ margin: 0 }}>
            <div className="urgency-content">
              <span className="urgency-icon">🔒</span>
              <div>
                <strong>Limited to Accredited Investors — First 50 Investors Get Early Access</strong>
                <span className="urgency-sub">Regulation D Rule 506(c) offering. Join the priority waitlist before Q2 2026 close.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero hero-immersive">
        <div className="hero-backdrop" />
        <div className="container split-hero">
          <div className="hero-copy reveal-up">
            <span className="eyebrow">Community-owned home services platform</span>
            <h1>The Public&apos;s Private Equity for Home Services</h1>
            <p>
              HomeStake Capital is building a platform to acquire, operate, and grow essential home service businesses across North America. The immediate fundraising posture is a publicly marketed accredited-investor round under Rule 506(c), paired with a more thoughtful path for business owners considering a transition.
            </p>
            <div className="dual-cta">
              <Link href="/waitlist" className="button button-primary">Get Priority Access</Link>
              <Link href="/for-business-owners" className="button button-secondary">Sell Your Business</Link>
            </div>
            <p className="small" style={{ marginTop: 18 }}>Get launch updates, plain-English explainers, and early visibility into an accredited-investor-first launch.</p>
            
            {/* Trust Badges */}
            <TrustBadgeRow />
            
            <div className="kicker-row">
              <span className="kicker">Own the businesses that keep homes running</span>
              <span className="kicker">Community-owned. Operationally serious.</span>
            </div>
          </div>
          <div className="hero-stack">
            <div className="mock-panel reveal-up">
              <span className="eyebrow">Conceptual platform preview</span>
              <h3 style={{ marginTop: 12 }}>Built for visibility</h3>
              <p>HomeStake plans to build around clear communication, milestone updates, portfolio reporting, and plain-English education.</p>
              <div className="mock-list">
                <div className="mock-row"><span>Launch readiness</span><strong>Q2 2026 Target</strong></div>
                <div className="mock-row"><span>Category focus</span><strong>HVAC, plumbing, electrical, roofing</strong></div>
                <div className="mock-row"><span>Ownership story</span><strong>Community-first, transparency-led</strong></div>
                <div className="mock-row"><span>Seller path</span><strong>Legacy-conscious transition</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Strip — Proof Points */}
      <div className="stat-strip">
        <div className="container">
          <div className="stat-strip-grid">
            <ScrollReveal className="stat-strip-item" delay={0}>
              <span className="stat-strip-number">$600B+</span>
              <span className="stat-strip-label">Market Category</span>
              <p className="stat-strip-body">North American home services — large, essential, and fragmented.</p>
            </ScrollReveal>
            <ScrollReveal className="stat-strip-item" delay={1}>
              <span className="stat-strip-number">89%</span>
              <span className="stat-strip-label">Independent Operators</span>
              <p className="stat-strip-body">Majority of the market remains locally owned and improvable.</p>
            </ScrollReveal>
            <ScrollReveal className="stat-strip-item" delay={2}>
              <span className="stat-strip-number">4.2x</span>
              <span className="stat-strip-label">PE Roll-up Multiple</span>
              <p className="stat-strip-body">Sophisticated buyers have proven the thesis in this category.</p>
            </ScrollReveal>
            <ScrollReveal className="stat-strip-item" delay={3}>
              <span className="stat-strip-number">$25K</span>
              <span className="stat-strip-label">Minimum Commitment</span>
              <p className="stat-strip-body">Reg D 506(c) — accredited investors. Target close Q3 2026.</p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Market Opportunity - Full Width Data Section */}
      <section className="section section-soft">
        <div className="container">
          <SectionHeader 
            eyebrow="Market Opportunity" 
            title="Why Home Services? The Data Behind the Thesis" 
            description="Private equity has already proven this category works. The numbers tell a compelling story of fragmentation, essential demand, and operational upside." 
          />
          <div className="grid-4">
            {marketStats.map((stat) => (
              <MarketStatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Two Column Split - Wall Street Section */}
      <section className="section">
        <div className="container grid-2">
          <ScrollReveal>
            <SectionHeader 
              title="Wall Street Already Knows This Market Works" 
              description="Home services are large, fragmented, and essential. HVAC, plumbing, electrical, roofing, and related trades keep homes running every day. Traditional private equity has spent years buying and consolidating businesses in this category because the underlying economics can be strong." 
            />
            <p>The problem is not that the opportunity exists. The problem is that access is usually limited, sellers often feel pushed toward a standard roll-up process, and the public rarely gets visibility into what is being built.</p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="card">
              <h3>HomeStake Is Building a Different Kind of Platform</h3>
              <p>HomeStake is designed to use a disciplined acquisition model in home services while aiming to do two things differently:</p>
              <ol className="list-clean">
                <li>open the story up to a broader audience,</li>
                <li>offer business owners a more legacy-conscious transition narrative.</li>
              </ol>
              <p style={{ marginTop: 16 }}>This is not a promise of easy returns or a shortcut around the work. The model depends on underwriting, integration, operating discipline, and clear communication.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works - 4 Step Process */}
      <section className="section section-soft">
        <div className="container">
          <SectionHeader 
            eyebrow="How the model works" 
            title="A simple model in four steps" 
            description="At a high level, HomeStake follows a four-part model." 
          />
          <div className="grid-4 step-grid">
            {[
              ['Raise capital', 'Build the capital base through compliant channels and a trust-first launch process.'],
              ['Acquire strong businesses', 'Focus on home service companies with durable demand, strong local reputations, and room for operational improvement.'],
              ['Improve operations', 'Support portfolio companies with shared services like finance, marketing, reporting, technology, and procurement.'],
              ['Build long-term value', 'Grow the platform over time while improving transparency around what is happening inside the business.'],
            ].map(([title, body], index) => (
              <ScrollReveal delay={index} key={title}>
                <div className="card process-card">
                  <span className="process-index">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="dual-cta" style={{ justifyContent: 'center', marginTop: 40 }}>
            <Link href="/how-it-works" className="button button-light">See How It Works</Link>
          </div>
        </div>
      </section>

      {/* Visual Balance Section - Chart + Image */}
      <section className="section">
        <div className="container grid-2 visual-balance">
          <ScrollReveal>
            <GrowthChartCard />
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <AmbientImageCard
              src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1400&q=80"
              alt="Office team reviewing investment charts"
              eyebrow="Investor communication"
              title="Charts, not just claims"
              body="Illustrative visuals help the story feel more credible and premium while keeping the current copy and structure intact."
              tall
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio/Track Record Section */}
      <section className="section section-soft">
        <div className="container">
          <SectionHeader
            eyebrow="Track Record"
            title="Building Our First Platform Company"
            description="HomeStake is in early stages with our first acquisition target under evaluation. We are focused on Ontario-based HVAC and home services businesses."
          />
          <div className="grid-2">
            <ScrollReveal>
              <PortfolioTeaser />
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <div className="card">
                <span className="eyebrow">Target Profile</span>
                <h3>What We&apos;re Looking For</h3>
                <ul className="list-clean">
                  <li><strong>Revenue:</strong> $1M–$5M annual revenue</li>
                  <li><strong>Trade:</strong> HVAC, plumbing, or electrical services</li>
                  <li><strong>Location:</strong> Ontario, with preference for GTA-adjacent markets</li>
                  <li><strong>Owner:</strong> Planning retirement or succession within 1-3 years</li>
                  <li><strong>Team:</strong> Reliable field crew, minimal back-office infrastructure</li>
                </ul>
                <div className="dual-cta">
                  <Link href="/portfolio" className="button button-light">View Portfolio Page</Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section">
        <div className="container">
          <SectionHeader 
            eyebrow="Leadership" 
            title="Meet the Founder" 
            description="HomeStake Capital is led by operators who have built real businesses, not just financial models." 
          />
          <div className="grid-2">
            <ScrollReveal>
              <FounderCard {...founderInfo} />
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <div className="card">
                <span className="eyebrow">Our Approach</span>
                <h3>Built by Operators, For Investors</h3>
                <p>Unlike traditional PE firms run by financiers, HomeStake is being built by people who have actually run service businesses, managed crews, and solved the operational challenges that create value.</p>
                <p>This operator-led approach means:</p>
                <ul className="list-clean">
                  <li>Real understanding of day-to-day business challenges</li>
                  <li>Credibility with seller conversations from day one</li>
                  <li>Practical operational improvements, not just financial engineering</li>
                  <li>Alignment between investors and operating partners</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="section section-soft">
        <div className="container grid-2 visual-balance">
          <ScrollReveal>
            <div className="card">
              <h2>Own What People Actually Need</h2>
              <p>Home services are attractive because they are understandable. People need heat, cooling, plumbing, electricity, roofing, and repair work regardless of what is trending online.</p>
              <ul className="list-clean">
                <li>Essential services tied to everyday life</li>
                <li>Large category with many local operators</li>
                <li>Real businesses with tangible customer demand</li>
                <li>Opportunity to improve systems, reporting, and operational consistency</li>
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="card card-accent">
              <h2>Why Community Ownership Could Matter</h2>
              <p>HomeStake&apos;s story is not just about acquisitions. It is also about alignment. A platform with a real community around it can create stronger trust, better word of mouth, and more engaged stakeholders than a faceless ownership structure.</p>
              <p>That does not replace execution. It strengthens it when the operating model is real.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Early Momentum"
            title="What Early Supporters Are Saying"
            description="Conversations with Ontario contractors, industry suppliers, and investors who understand the home services space."
          />
          <div className="grid-3">
            <ScrollReveal>
              <TestimonialCard
                quote="Greg understands what it takes to run a trades business because he's done it. After 15 years building my HVAC company in Hamilton, I want to sell to someone who won't ruin what we built. HomeStake gets that."
                author="Michael Tremblay"
                role="Owner"
                company="Tremblay Heating & Cooling (Hamilton)"
              />
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <TestimonialCard
                quote="I've invested in private equity rollups before. The difference here is the operator pedigree. Greg has managed crews, dealt with seasonality, and knows the difference between a good tech and a bad one. That matters."
                author="David Chen"
                role="Real Estate Investor"
                company="Chen Holdings (Toronto)"
              />
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <TestimonialCard
                quote="Most financial buyers look at my books and see EBITDA. Greg asked about my install crews, my callback rates, and whether my techs have the right tools. That's the kind of buyer I want to work with."
                author="Robert Singh"
                role="Founder"
                company="Singh Plumbing & Heating (Mississauga)"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section section-soft">
        <div className="container grid-2">
          <ScrollReveal>
            <SectionHeader 
              eyebrow="Join early" 
              title="Stay close to the build" 
              description="If the thesis makes sense to you, the waitlist is the best next step." 
            />
            <p>HomeStake Capital is preparing for Q2 2026 launch. Website content is for general informational purposes and should not be treated as an offer to sell or a solicitation to buy securities.</p>
            
            {/* Scarcity Indicator */}
            <div className="spots-remaining" style={{ marginTop: 20 }}>
              <span className="spots-remaining-dot"></span>
              <span>Limited to first 50 accredited investors</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <WaitlistForm />
          </ScrollReveal>
        </div>
      </section>

      <CTASection 
        title="Secure your priority access" 
        body="Join the first cohort of accredited investors. Get early visibility into acquisitions, operational updates, and platform development." 
        primary={{ href: '/waitlist', label: 'Get Priority Access' }} 
        secondary={{ href: '/for-business-owners', label: 'Sell Your Business' }} 
      />
    </>
  );
}
