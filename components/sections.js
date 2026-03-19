import Link from 'next/link';

export function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-heading reveal-up">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function CTASection({ title, body, primary, secondary }) {
  return (
    <section className="section-tight">
      <div className="container">
        <div className="band reveal-up">
          <div>
            <h2 style={{ marginBottom: 10 }}>{title}</h2>
            <p>{body}</p>
          </div>
          <div className="dual-cta">
            {primary ? <Link href={primary.href} className="button button-primary">{primary.label}</Link> : null}
            {secondary ? <Link href={secondary.href} className="button button-secondary">{secondary.label}</Link> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WaitlistForm({ compact = false }) {
  return (
    <form className="form-shell card reveal-up" action="#" method="post">
      <div className={compact ? '' : 'form-grid'}>
        <input className="field" name="firstName" placeholder="First name" />
        <input className="field" type="email" name="email" placeholder="Email address" required />
        {!compact ? <input className="field" name="location" placeholder="Country / province / state" /> : null}
        {!compact ? (
          <select name="interest" defaultValue="">
            <option value="" disabled>I&apos;m most interested as…</option>
            <option>Investor</option>
            <option>Business owner</option>
            <option>Partner</option>
            <option>Just curious</option>
          </select>
        ) : null}
      </div>
      <button className="button button-primary" type="submit">Join the Waitlist</button>
      <p className="small">By joining, you agree to receive launch updates, educational content, and product news from HomeStake Capital. You can unsubscribe at any time.</p>
      <p className="small">This page is for updates and education. Any future offering would be made only through formal offering materials where permitted.</p>
    </form>
  );
}

export function SellerForm() {
  return (
    <form className="form-shell card reveal-up" action="#" method="post">
      <div className="form-grid">
        <input className="field" name="company" placeholder="Company name" />
        <input className="field" name="owner" placeholder="Owner name" />
        <input className="field" type="email" name="email" placeholder="Email" />
        <input className="field" name="phone" placeholder="Phone" />
        <input className="field" name="trade" placeholder="Trade" />
        <input className="field" name="location" placeholder="Location" />
        <input className="field" name="revenue" placeholder="Revenue range" />
        <input className="field" name="timeline" placeholder="Timeline" />
      </div>
      <textarea name="notes" placeholder="Tell us a little about your business, timing, and goals." />
      <button className="button button-primary" type="submit">Start a Confidential Conversation</button>
      <p className="small">Please avoid sending highly sensitive financial or legal documents in your first message. Early conversations are meant to determine fit and next steps.</p>
    </form>
  );
}

export function ContactForm() {
  return (
    <form className="form-shell card reveal-up" action="#" method="post">
      <div className="form-grid">
        <input className="field" name="name" placeholder="Full name" />
        <input className="field" type="email" name="email" placeholder="Email address" />
        <select name="type" defaultValue="">
          <option value="" disabled>Inquiry type</option>
          <option>Investor</option>
          <option>Business owner</option>
          <option>Partner / advisor</option>
          <option>Media</option>
          <option>General</option>
        </select>
        <div className="notice">Please do not include highly sensitive financial, legal, or personal information in your first message.</div>
      </div>
      <textarea name="message" placeholder="Message" />
      <button className="button button-primary" type="submit">Send Message</button>
    </form>
  );
}

export function FAQList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <div className="faq-item" key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
    </div>
  );
}
