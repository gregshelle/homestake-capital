import { PageHero } from '../../components/layout';
import { CTASection, ContactForm } from '../../components/sections';

export const metadata = {
  title: 'Contact HomeStake Capital | Investor, Seller, and Partner Inquiries',
  description:
    'Contact HomeStake Capital for investor, seller, partner, advisor, or media inquiries, or use the waitlist and seller pages for the most direct next step.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact HomeStake" title="Get in Touch" description="Whether you are a future investor, business owner, advisor, partner, or member of the media, use this page to reach the right team." />
      <section className="section"><div className="container grid-2"><div><h2>Tell Us What You Need</h2><p>Choose the inquiry type that best fits your message so we can route it properly.</p><div className="card"><h3>Who this page is for</h3><ul className="list-clean"><li><strong>Investor</strong> — Questions about the waitlist, launch updates, or the general model.</li><li><strong>Business owner</strong> — Questions about fit, timing, or a possible confidential conversation.</li><li><strong>Partner / advisor</strong> — Questions about collaboration, introductions, or strategic support.</li><li><strong>Media</strong> — Press, podcast, speaking, or interview requests.</li></ul></div></div><ContactForm /></div></section>
      <section className="section"><div className="container grid-3">{[['What to expect','HomeStake aims to review inquiries and route them to the appropriate next step as quickly as possible. Response timing may vary depending on message type and current build stage.'],['Business owner?','If you are exploring succession, retirement, or a sale, the seller path may be the better place to start.'],['Future investor?','If your main goal is to stay informed as HomeStake develops, the waitlist is the simplest next step.']].map(([title, body]) => <div className="card" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></section>
      <section className="section"><div className="container card"><h2>Privacy and discretion</h2><p>Website inquiries should be treated as an initial contact point. More formal information-sharing should happen only after fit, process, and handling expectations are clear.</p></div></section>
      <CTASection title="Choose the path that fits" body="Use the seller path for succession conversations, the waitlist for investor updates, or the contact form for partner, advisor, or media outreach." primary={{ href: '/for-business-owners', label: 'Start a Confidential Conversation' }} secondary={{ href: '/waitlist', label: 'Join the Waitlist' }} />
    </>
  );
}
