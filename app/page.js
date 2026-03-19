import Link from 'next/link';
import { CTASection, SectionHeader, WaitlistForm } from '../components/sections';
import { AmbientImageCard, GrowthChartCard, TimelineChartCard } from '../components/visuals';

const stats = [
  ['$600B+ category', 'North American home services represent a massive essential-services market.'],
  ['Highly fragmented', 'Many businesses remain locally owned and operationally improvable.'],
  ['Private equity validated', 'Sophisticated buyers have already proven the roll-up thesis in this category.'],
  ['Built for long-term value', 'HomeStake is being designed around acquisitions, operations, and reporting, not just a launch narrative.'],
];

const transparency = ['Launch updates and milestones', 'Portfolio and acquisition visibility', 'Documents and disclosures', 'Ongoing communication designed to be understandable'];

export default function HomePage() {
  return (
    <>
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
              <Link href="/waitlist" className="button button-primary">Join the Waitlist</Link>
              <Link href="/for-business-owners" className="button button-secondary">For Business Owners</Link>
            </div>
            <p className="small" style={{ marginTop: 18 }}>Get launch updates, plain-English explainers, and early visibility into an accredited-investor-first launch.</p>
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
                <div className="mock-row"><span>Launch readiness</span><strong>In build mode</strong></div>
                <div className="mock-row"><span>Category focus</span><strong>HVAC, plumbing, electrical, roofing</strong></div>
                <div className="mock-row"><span>Ownership story</span><strong>Community-first, transparency-led</strong></div>
                <div className="mock-row"><span>Seller path</span><strong>Legacy-conscious transition</strong></div>
              </div>
            </div>
            <AmbientImageCard
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
              alt="Premium city skyline and commercial real estate"
              eyebrow="Premium positioning"
              title="A capital brand with real-world texture"
              body="Layering in cityscape and portfolio-style visuals makes the platform feel established instead of conceptual."
            />
          </div>
        </div>
        <div className="container section-tight">
          <div className="grid-4">
            {stats.map(([title, body]) => (
              <div className="stat reveal-up" key={title}>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <SectionHeader title="Wall Street Already Knows This Market Works" description="Home services are large, fragmented, and essential. HVAC, plumbing, electrical, roofing, and related trades keep homes running every day. Traditional private equity has spent years buying and consolidating businesses in this category because the underlying economics can be strong." />
            <p>The problem is not that the opportunity exists. The problem is that access is usually limited, sellers often feel pushed toward a standard roll-up process, and the public rarely gets visibility into what is being built.</p>
          </div>
          <div className="card">
            <h3>HomeStake Is Building a Different Kind of Platform</h3>
            <p>HomeStake is designed to use a disciplined acquisition model in home services while aiming to do two things differently:</p>
            <ol className="list-clean">
              <li>open the story up to a broader audience,</li>
              <li>offer business owners a more legacy-conscious transition narrative.</li>
            </ol>
            <p style={{ marginTop: 16 }}>This is not a promise of easy returns or a shortcut around the work. The model depends on underwriting, integration, operating discipline, and clear communication.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="How the model works" title="A simple model in four steps" description="At a high level, HomeStake follows a four-part model." />
          <div className="grid-4 step-grid">
            {[
              ['Raise capital', 'Build the capital base through compliant channels and a trust-first launch process.'],
              ['Acquire strong businesses', 'Focus on home service companies with durable demand, strong local reputations, and room for operational improvement.'],
              ['Improve operations', 'Support portfolio companies with shared services like finance, marketing, reporting, technology, and procurement.'],
              ['Build long-term value', 'Grow the platform over time while improving transparency around what is happening inside the business.'],
            ].map(([title, body], index) => (
              <div className="card process-card reveal-up" key={title}>
                <span className="process-index">0{index + 1}</span>
                <h3>{title}</h3><p>{body}</p>
              </div>
            ))}
          </div>
          <div className="dual-cta"><Link href="/how-it-works" className="button button-light">See How It Works</Link></div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container grid-2 visual-balance">
          <GrowthChartCard />
          <AmbientImageCard
            src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1400&q=80"
            alt="Office team reviewing investment charts"
            eyebrow="Investor communication"
            title="Charts, not just claims"
            body="Illustrative visuals help the story feel more credible and premium while keeping the current copy and structure intact."
            tall
          />
        </div>
      </section>

      <section className="section">
        <div className="container grid-2 visual-balance">
          <div className="card reveal-up">
            <h2>Own What People Actually Need</h2>
            <p>Home services are attractive because they are understandable. People need heat, cooling, plumbing, electricity, roofing, and repair work regardless of what is trending online.</p>
            <ul className="list-clean">
              <li>Essential services tied to everyday life</li>
              <li>Large category with many local operators</li>
              <li>Real businesses with tangible customer demand</li>
              <li>Opportunity to improve systems, reporting, and operational consistency</li>
            </ul>
          </div>
          <div className="card card-accent reveal-up">
            <h2>Why Community Ownership Could Matter</h2>
            <p>HomeStake&apos;s story is not just about acquisitions. It is also about alignment. A platform with a real community around it can create stronger trust, better word of mouth, and more engaged stakeholders than a faceless ownership structure.</p>
            <p>That does not replace execution. It strengthens it when the operating model is real.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2 visual-balance">
          <AmbientImageCard
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80"
            alt="Commercial office handshake meeting"
            eyebrow="Seller trust"
            title="A more personal transition story"
            body="Seller-facing imagery gives the business-owner path more warmth and confidence without changing the copy strategy."
            tall
          />
          <TimelineChartCard />
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card">
            <span className="eyebrow">For future investors</span>
            <h2>Follow a model built around real operating businesses</h2>
            <p>If you are an accredited investor, operator, or strategic partner who wants to follow a platform built around real operating businesses instead of abstract stories, the waitlist is the best next step.</p>
            <ul className="list-clean">
              <li>Plain-English explanations of the model</li>
              <li>Ongoing launch and build updates</li>
              <li>Deeper FAQ and risk framing over time</li>
              <li>Early visibility into how the platform is intended to work</li>
            </ul>
            <div className="dual-cta"><Link href="/waitlist" className="button button-primary">Join the Waitlist</Link></div>
          </div>
          <div className="card">
            <span className="eyebrow">For business owners</span>
            <h2>Sell without selling out</h2>
            <p>If you have built a home service business and are thinking about succession, retirement, or your next chapter, HomeStake is being built to offer a more thoughtful alternative to the standard financial-buyer pitch.</p>
            <ul className="list-clean">
              <li>Legacy-conscious transition framing</li>
              <li>Respect for local reputation and team continuity</li>
              <li>Clearer explanation of process and fit</li>
              <li>Early conversations designed around discretion and alignment</li>
            </ul>
            <div className="dual-cta"><Link href="/for-business-owners" className="button button-light">Start a Confidential Conversation</Link></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <SectionHeader eyebrow="Operating discipline" title="Built around a hub-and-spoke acquisition model" description="HomeStake is intended to follow a hub-and-spoke approach: acquire strong platform businesses in attractive local markets, then add density and capability around them over time." />
            <p>The goal is not growth for its own sake. The goal is stronger operations, better systems, and more durable long-term value creation.</p>
          </div>
          <div className="card">
            <h3>Built for visibility</h3>
            <p>If the public is invited into the story, the business should be easier to understand.</p>
            <ul className="list-clean">
              {transparency.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <SectionHeader eyebrow="Join early" title="Stay close to the build" description="If the thesis makes sense to you, the waitlist is the best next step." />
            <p>HomeStake Capital is in build mode. Website content is for general informational purposes and should not be treated as an offer to sell or a solicitation to buy securities.</p>
          </div>
          <WaitlistForm />
        </div>
      </section>

      <CTASection title="Follow the build early" body="Whether you are a future investor, a business owner, or a partner, the best next step is to choose the path that fits you." primary={{ href: '/waitlist', label: 'Join the Waitlist' }} secondary={{ href: '/for-business-owners', label: 'Start a Confidential Conversation' }} />
    </>
  );
}
