'use client';

import Link from 'next/link';
import { useState } from 'react';

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
  const [fields, setFields] = useState({ firstName: '', email: '', location: '', interest: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e = {};
    if (!fields.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Please enter a valid email address.';
    return e;
  }

  function handleChange(k, v) {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; });
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 900);
  }

  if (success) {
    return (
      <div className="card reveal-up form-shell" role="alert">
        <div className="success-message">✓ You&apos;re on the list! We&apos;ll be in touch with launch updates.</div>
        <p className="small">This page is for updates and education. Any future offering would be made only through formal offering materials where permitted.</p>
      </div>
    );
  }

  return (
    <form className="form-shell card reveal-up" onSubmit={handleSubmit} noValidate aria-label="Join the waitlist">
      <p className="required-legend">Fields marked <span className="required-star" aria-hidden="true">*</span> are required</p>
      <div className={compact ? '' : 'form-grid'}>
        <div className="form-field-group">
          <label className="form-label" htmlFor="waitlist-firstName">First name</label>
          <input
            id="waitlist-firstName"
            className={`field${errors.firstName ? ' field-error' : ''}`}
            name="firstName"
            placeholder="e.g. Jane"
            value={fields.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            autoComplete="given-name"
          />
        </div>
        <div className="form-field-group">
          <label className="form-label" htmlFor="waitlist-email">Email address <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
          <input
            id="waitlist-email"
            className={`field${errors.email ? ' field-error' : ''}`}
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            aria-required="true"
            aria-describedby={errors.email ? 'waitlist-email-error' : undefined}
            value={fields.email}
            onChange={(e) => handleChange('email', e.target.value)}
            autoComplete="email"
          />
          {errors.email && <span id="waitlist-email-error" className="error-message" role="alert">⚠ {errors.email}</span>}
        </div>
        {!compact && (
          <div className="form-field-group">
            <label className="form-label" htmlFor="waitlist-location">Country / province / state</label>
            <input
              id="waitlist-location"
              className="field"
              name="location"
              placeholder="e.g. Ontario, Canada"
              value={fields.location}
              onChange={(e) => handleChange('location', e.target.value)}
              autoComplete="country-name"
            />
          </div>
        )}
        {!compact && (
          <div className="form-field-group">
            <label className="form-label" htmlFor="waitlist-interest">I&apos;m most interested as…</label>
            <select
              id="waitlist-interest"
              name="interest"
              className="field"
              value={fields.interest}
              onChange={(e) => handleChange('interest', e.target.value)}
              aria-label="I'm most interested as"
            >
              <option value="" disabled>Select an option</option>
              <option value="investor">Investor</option>
              <option value="owner">Business owner</option>
              <option value="partner">Partner</option>
              <option value="curious">Just curious</option>
            </select>
          </div>
        )}
      </div>
      <button className="button button-primary" type="submit" disabled={loading} aria-busy={loading}>
        {loading ? 'Submitting…' : 'Join the Waitlist'}
      </button>
      <p className="small">By joining, you agree to receive launch updates, educational content, and product news from HomeStake Capital. You can unsubscribe at any time.</p>
      <p className="small">This page is for updates and education. Any future offering would be made only through formal offering materials where permitted.</p>
    </form>
  );
}

export function SellerForm() {
  const [fields, setFields] = useState({ company: '', owner: '', email: '', phone: '', trade: '', location: '', revenue: '', timeline: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e = {};
    if (!fields.company.trim()) e.company = 'Company name is required.';
    if (!fields.owner.trim()) e.owner = 'Owner name is required.';
    if (!fields.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Please enter a valid email address.';
    return e;
  }

  function handleChange(k, v) {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; });
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 900);
  }

  if (success) {
    return (
      <div className="card reveal-up form-shell" role="alert">
        <div className="success-message">✓ Thank you! We&apos;ll be in touch to discuss your business and next steps.</div>
        <p className="small">Please avoid sending highly sensitive financial or legal documents in your first message.</p>
      </div>
    );
  }

  return (
    <form className="form-shell card reveal-up" onSubmit={handleSubmit} noValidate aria-label="Seller inquiry form">
      <p className="required-legend">Fields marked <span className="required-star" aria-hidden="true">*</span> are required</p>
      <div className="form-grid">
        <div className="form-field-group">
          <label className="form-label" htmlFor="seller-company">Company name <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
          <input id="seller-company" className={`field${errors.company ? ' field-error' : ''}`} name="company" placeholder="Your business name" value={fields.company} onChange={(e) => handleChange('company', e.target.value)} aria-required="true" aria-describedby={errors.company ? 'seller-company-error' : undefined} />
          {errors.company && <span id="seller-company-error" className="error-message" role="alert">⚠ {errors.company}</span>}
        </div>
        <div className="form-field-group">
          <label className="form-label" htmlFor="seller-owner">Owner name <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
          <input id="seller-owner" className={`field${errors.owner ? ' field-error' : ''}`} name="owner" placeholder="Your full name" value={fields.owner} onChange={(e) => handleChange('owner', e.target.value)} aria-required="true" aria-describedby={errors.owner ? 'seller-owner-error' : undefined} autoComplete="name" />
          {errors.owner && <span id="seller-owner-error" className="error-message" role="alert">⚠ {errors.owner}</span>}
        </div>
        <div className="form-field-group">
          <label className="form-label" htmlFor="seller-email">Email address <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
          <input id="seller-email" className={`field${errors.email ? ' field-error' : ''}`} type="email" name="email" placeholder="you@example.com" value={fields.email} onChange={(e) => handleChange('email', e.target.value)} aria-required="true" aria-describedby={errors.email ? 'seller-email-error' : undefined} autoComplete="email" />
          {errors.email && <span id="seller-email-error" className="error-message" role="alert">⚠ {errors.email}</span>}
        </div>
        <div className="form-field-group">
          <label className="form-label" htmlFor="seller-phone">Phone number</label>
          <input id="seller-phone" className="field" type="tel" name="phone" placeholder="e.g. 416-555-0100" value={fields.phone} onChange={(e) => handleChange('phone', e.target.value)} autoComplete="tel" />
        </div>
        <div className="form-field-group">
          <label className="form-label" htmlFor="seller-trade">Trade / service type</label>
          <input id="seller-trade" className="field" name="trade" placeholder="e.g. HVAC, Plumbing" value={fields.trade} onChange={(e) => handleChange('trade', e.target.value)} />
        </div>
        <div className="form-field-group">
          <label className="form-label" htmlFor="seller-location">Business location</label>
          <input id="seller-location" className="field" name="location" placeholder="City, Province / State" value={fields.location} onChange={(e) => handleChange('location', e.target.value)} />
        </div>
        <div className="form-field-group">
          <label className="form-label" htmlFor="seller-revenue">Annual revenue range</label>
          <input id="seller-revenue" className="field" name="revenue" placeholder="e.g. $1M–$3M" value={fields.revenue} onChange={(e) => handleChange('revenue', e.target.value)} />
        </div>
        <div className="form-field-group">
          <label className="form-label" htmlFor="seller-timeline">Transition timeline</label>
          <input id="seller-timeline" className="field" name="timeline" placeholder="e.g. 1–2 years" value={fields.timeline} onChange={(e) => handleChange('timeline', e.target.value)} />
        </div>
      </div>
      <div className="form-field-group">
        <label className="form-label" htmlFor="seller-notes">About your business</label>
        <textarea id="seller-notes" name="notes" className="field" placeholder="Tell us a little about your business, timing, and goals." value={fields.notes} onChange={(e) => handleChange('notes', e.target.value)} />
      </div>
      <button className="button button-primary" type="submit" disabled={loading} aria-busy={loading}>
        {loading ? 'Submitting…' : 'Start a Confidential Conversation'}
      </button>
      <p className="small">Please avoid sending highly sensitive financial or legal documents in your first message. Early conversations are meant to determine fit and next steps.</p>
    </form>
  );
}

export function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', type: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e = {};
    if (!fields.name.trim()) e.name = 'Full name is required.';
    if (!fields.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Please enter a valid email address.';
    if (!fields.message.trim()) e.message = 'Message is required.';
    return e;
  }

  function handleChange(k, v) {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; });
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 900);
  }

  if (success) {
    return (
      <div className="card reveal-up form-shell" role="alert">
        <div className="success-message">✓ Message sent! We&apos;ll review your inquiry and get back to you.</div>
      </div>
    );
  }

  return (
    <form className="form-shell card reveal-up" onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <p className="required-legend">Fields marked <span className="required-star" aria-hidden="true">*</span> are required</p>
      <div className="notice">Please do not include highly sensitive financial, legal, or personal information in your first message.</div>
      <div className="form-grid">
        <div className="form-field-group">
          <label className="form-label" htmlFor="contact-name">Full name <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
          <input id="contact-name" className={`field${errors.name ? ' field-error' : ''}`} name="name" placeholder="Your full name" value={fields.name} onChange={(e) => handleChange('name', e.target.value)} aria-required="true" aria-describedby={errors.name ? 'contact-name-error' : undefined} autoComplete="name" />
          {errors.name && <span id="contact-name-error" className="error-message" role="alert">⚠ {errors.name}</span>}
        </div>
        <div className="form-field-group">
          <label className="form-label" htmlFor="contact-email">Email address <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
          <input id="contact-email" className={`field${errors.email ? ' field-error' : ''}`} type="email" name="email" placeholder="you@example.com" value={fields.email} onChange={(e) => handleChange('email', e.target.value)} aria-required="true" aria-describedby={errors.email ? 'contact-email-error' : undefined} autoComplete="email" />
          {errors.email && <span id="contact-email-error" className="error-message" role="alert">⚠ {errors.email}</span>}
        </div>
        <div className="form-field-group">
          <label className="form-label" htmlFor="contact-type">Inquiry type</label>
          <select id="contact-type" name="type" className="field" value={fields.type} onChange={(e) => handleChange('type', e.target.value)} aria-label="Inquiry type">
            <option value="" disabled>Select inquiry type</option>
            <option value="investor">Investor</option>
            <option value="owner">Business owner</option>
            <option value="partner">Partner / advisor</option>
            <option value="media">Media</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>
      <div className="form-field-group">
        <label className="form-label" htmlFor="contact-message">Message <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
        <textarea id="contact-message" name="message" className={`field${errors.message ? ' field-error' : ''}`} placeholder="How can we help?" value={fields.message} onChange={(e) => handleChange('message', e.target.value)} aria-required="true" aria-describedby={errors.message ? 'contact-message-error' : undefined} />
        {errors.message && <span id="contact-message-error" className="error-message" role="alert">⚠ {errors.message}</span>}
      </div>
      <button className="button button-primary" type="submit" disabled={loading} aria-busy={loading}>
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

// Improved FAQ Accordion Component
export function FAQAccordion({ items, category }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-section">
      {category && <h3 className="faq-section-title">{category}</h3>}
      <div className="faq-accordion">
        {items.map((item, index) => (
          <div className="faq-item" key={index}>
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              {item.q}
              <span className={`faq-question-icon ${openIndex === index ? 'open' : ''}`}>+</span>
            </button>
            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Legacy FAQ List for backwards compatibility
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

// Social Proof Components
export function TestimonialCard({ quote, author, role, company }) {
  return (
    <div className="card testimonial-card">
      <div className="testimonial-quote">&ldquo;{quote}&rdquo;</div>
      <div className="testimonial-author">
        <strong>{author}</strong>
        <span>{role}{company ? `, ${company}` : ''}</span>
      </div>
    </div>
  );
}

export function TrustBadgeRow() {
  const badges = [
    { label: 'Reg D 506(c) Compliant', icon: '✓' },
    { label: 'Accredited Investors Only', icon: '🔒' },
    { label: 'Transparent Reporting', icon: '📊' },
    { label: 'Real Operating Businesses', icon: '🏢' },
  ];
  return (
    <div className="trust-badge-row">
      {badges.map((badge) => (
        <div key={badge.label} className="trust-badge">
          <span className="trust-badge-icon">{badge.icon}</span>
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

export function IndustryRecognition() {
  const associations = [
    { name: 'HVAC Excellence', desc: 'Industry training and certification standards' },
    { name: 'Canadian Home Builders Association', desc: 'National residential construction association' },
    { name: 'Ontario General Contractors Association', desc: 'Provincial contractor association' }
  ];
  return (
    <div className="industry-recognition">
      <span className="eyebrow">Industry Recognition</span>
      <div className="association-list">
        {associations.map((assoc) => (
          <div key={assoc.name} className="association-item">
            <strong>{assoc.name}</strong>
            <span className="association-desc">{assoc.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Deprecated: Use IndustryRecognition instead
export function AsFeaturedIn() {
  return <IndustryRecognition />;
}

// Urgency/Scarcity Components
export function UrgencyBanner({ message, submessage }) {
  return (
    <div className="urgency-banner">
      <div className="urgency-content">
        <span className="urgency-icon">⚡</span>
        <div>
          <strong>{message}</strong>
          {submessage && <span className="urgency-sub">{submessage}</span>}
        </div>
      </div>
    </div>
  );
}

export function InvestorGateBanner() {
  return (
    <div className="investor-gate-banner">
      <div className="gate-icon">🔒</div>
      <div className="gate-content">
        <h3>Accredited Investors Only</h3>
        <p>This offering is available exclusively to verified accredited investors under Regulation D Rule 506(c). Investment involves significant risks including potential loss of capital.</p>
      </div>
    </div>
  );
}

// Founder/Team Components
export function FounderCard({ name, role, bio, experience, image, linkedin }) {
  return (
    <div className="card founder-card">
      <div className="founder-avatar">
        {image ? <img src={image} alt={name} /> : <div className="founder-avatar-placeholder">{name.split(' ').map(n => n[0]).join('')}</div>}
      </div>
      <div className="founder-info">
        <h3>{name}</h3>
        <span className="founder-role">{role}</span>
        <p>{bio}</p>
        {experience && (
          <ul className="founder-experience">
            {experience.map((exp, i) => <li key={i}>{exp}</li>)}
          </ul>
        )}
        {linkedin && (
          <div style={{ marginTop: 12 }}>
            <a 
              href={linkedin}
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)', textDecoration: 'none' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Market Stats Component
export function MarketStatCard({ value, label, source }) {
  return (
    <div className="card market-stat-card">
      <span className="market-stat-value">{value}</span>
      <span className="market-stat-label">{label}</span>
      {source && <span className="market-stat-source">{source}</span>}
    </div>
  );
}

// Portfolio/Track Record Component
export function PortfolioTeaser() {
  return (
    <div className="card portfolio-teaser">
      <span className="eyebrow">Track Record</span>
      <h3>First Acquisition in Progress</h3>
      <p>HomeStake is actively evaluating HVAC and home services businesses in Ontario. Our initial platform company will serve as the foundation for a rollup strategy focused on operational improvement and complementary service add-ons.</p>
      <div className="portfolio-metrics">
        <div className="portfolio-metric">
          <strong>Initial Wedge</strong>
          <span>HVAC & Home Services</span>
        </div>
        <div className="portfolio-metric">
          <strong>Geographic Focus</strong>
          <span>Ontario-based targets</span>
        </div>
        <div className="portfolio-metric">
          <strong>Target Close</strong>
          <span>Q3 2026</span>
        </div>
      </div>
      <div className="notice" style={{ marginTop: 20 }}>
        Value creation through operational improvements, shared back-office services, and strategic add-on acquisitions.
      </div>
    </div>
  );
}
