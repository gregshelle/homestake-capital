import { PageHero } from '../../components/layout';

export default function PortfolioPage() {
  return <><PageHero eyebrow="Portfolio" title="What We Own — and What We Plan to Build" description="HomeStake&apos;s portfolio page is included as an MVP template. Actual acquisitions should only appear here once they are real, approved for publication, and clearly described." primaryCta={{ href: '/waitlist', label: 'Join the Waitlist' }} secondaryCta={{ href: '/for-business-owners', label: 'Sell Your Business' }} /><section className="section"><div className="container card"><h2>No acquisitions announced yet</h2><p>The current focus is on brand clarity, compliance path, funnel readiness, and operating assumptions.</p><p>This page is designed to become the public bridge for future portfolio visibility without using fake companies, fake metrics, or placeholder proof that could mislead visitors.</p></div></section></>;
}
