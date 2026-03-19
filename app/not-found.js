import Link from 'next/link';
import { PageHero } from '../components/layout';

export const metadata = {
  title: 'Page Not Found | HomeStake Capital',
  description: 'The page you are looking for could not be found. Return to HomeStake Capital homepage or contact us for assistance.',
};

export default function NotFoundPage() {
  return (
    <>
      <PageHero 
        eyebrow="404 Error" 
        title="Page Not Found" 
        description="The page you are looking for could not be found. It may have been moved, renamed, or temporarily unavailable." 
      />
      
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div className="card">
              <h2>What You Can Do</h2>
              <ul className="list-clean">
                <li><strong>Return to the homepage</strong> — Start fresh from our main page</li>
                <li><strong>Visit the waitlist</strong> — Join early investors following the HomeStake build</li>
                <li><strong>Contact us</strong> — Reach out if you need specific assistance</li>
                <li><strong>Check the URL</strong> — Make sure the web address is spelled correctly</li>
              </ul>
              <div className="dual-cta" style={{ marginTop: 24 }}>
                <Link href="/" className="button button-primary">Return Home</Link>
                <Link href="/contact" className="button button-light">Contact Support</Link>
              </div>
            </div>
            
            <div className="card">
              <h2>Popular Destinations</h2>
              <div className="portal-list" style={{ marginTop: 16 }}>
                <Link href="/waitlist" className="portal-list-row portal-list-link">
                  <strong>Join the Waitlist</strong>
                  <span>→</span>
                </Link>
                <Link href="/for-investors" className="portal-list-row portal-list-link">
                  <strong>For Investors</strong>
                  <span>→</span>
                </Link>
                <Link href="/for-business-owners" className="portal-list-row portal-list-link">
                  <strong>Sell Your Business</strong>
                  <span>→</span>
                </Link>
                <Link href="/how-it-works" className="portal-list-row portal-list-link">
                  <strong>How It Works</strong>
                  <span>→</span>
                </Link>
                <Link href="/faq" className="portal-list-row portal-list-link">
                  <strong>FAQ</strong>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="card" style={{ marginTop: 32, textAlign: 'center' }}>
            <h3>Need Help?</h3>
            <p>If you believe this is an error or need assistance finding what you&apos;re looking for, please contact us.</p>
            <div style={{ marginTop: 16 }}>
              <p className="small">
                <strong>Email:</strong>{' '}
                <a href="mailto:invest@homestakecapital.com">invest@homestakecapital.com</a>
              </p>
              <p className="small">
                <strong>Phone:</strong>{' '}
                <a href="tel:+12897688694">289-768-8694</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
