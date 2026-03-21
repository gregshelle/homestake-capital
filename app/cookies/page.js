import { PageHero } from '../../components/layout';

export const metadata = {
  title: 'Cookie Policy | HomeStake Capital',
  description:
    'How HomeStake Capital uses cookies and similar tracking technologies on our website. Learn about the types of cookies we use and how to manage your preferences.',
};

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookie Policy"
        description="This policy explains how HomeStake Capital uses cookies and similar technologies when you visit our website."
      />

      <section className="section">
        <div className="container card">
          <p><strong>Last Updated:</strong> March 2026</p>
          <p style={{ fontStyle: 'italic', opacity: 0.85 }}>
            <strong>Disclaimer:</strong> This Cookie Policy is provided for informational purposes only and does not constitute legal advice. You should consult qualified legal counsel for advice regarding your specific situation and applicable privacy laws.
          </p>
          <p>
            HomeStake Capital Inc. (&quot;HomeStake,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar tracking technologies on our website at homestakecapital.com (the &quot;Site&quot;). This Cookie Policy explains what cookies are, the types of cookies we use, why we use them, and how you can control them.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, provide a better browsing experience, and give website operators information about how visitors use the site.
          </p>
          <p>
            Cookies may be set by the website you are visiting (&quot;first-party cookies&quot;) or by third-party services that the website uses (&quot;third-party cookies&quot;). Cookies may last for a single browsing session (&quot;session cookies&quot;) or persist on your device until they expire or are deleted (&quot;persistent cookies&quot;).
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>2. Types of Cookies We Use</h2>

          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the Site to function properly. They enable core functionality such as page navigation, secure areas, and form submissions. The Site cannot function properly without these cookies, and they cannot be disabled.
          </p>
          <ul className="list-clean">
            <li><strong>Session management:</strong> Maintains your session as you navigate the Site.</li>
            <li><strong>Security:</strong> Helps protect against cross-site request forgery and other security threats.</li>
            <li><strong>Cookie consent:</strong> Remembers your cookie preferences so you are not asked repeatedly.</li>
          </ul>

          <h3>Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with the Site by collecting and reporting information anonymously. This helps us improve the Site&apos;s structure, content, and functionality.
          </p>
          <ul className="list-clean">
            <li><strong>Page views and navigation:</strong> Tracks which pages are visited and how visitors move through the Site.</li>
            <li><strong>Traffic sources:</strong> Identifies how visitors found the Site (search engine, direct link, referral).</li>
            <li><strong>Performance data:</strong> Measures page load times and other technical performance metrics.</li>
          </ul>

          <h3>Functional Cookies</h3>
          <p>
            These cookies enable enhanced functionality and personalization, such as remembering your preferences or login state for the investor portal.
          </p>
          <ul className="list-clean">
            <li><strong>User preferences:</strong> Remembers settings such as language or display preferences.</li>
            <li><strong>Portal authentication:</strong> Keeps you logged in to the investor portal during your session.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>3. Purpose of Each Cookie</h2>
          <table className="compare">
            <thead>
              <tr>
                <th>Cookie Type</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Session</td>
                <td>Maintains your browsing session and form state</td>
                <td>Session (cleared when browser closes)</td>
              </tr>
              <tr>
                <td>Cookie consent</td>
                <td>Stores your cookie consent preferences</td>
                <td>12 months</td>
              </tr>
              <tr>
                <td>Analytics</td>
                <td>Collects anonymous usage data to improve the Site</td>
                <td>Up to 24 months</td>
              </tr>
              <tr>
                <td>Authentication</td>
                <td>Maintains your login state in the investor portal</td>
                <td>Session or up to 30 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>4. Third-Party Cookies</h2>
          <p>
            We may use third-party services that set their own cookies on your device. These third-party cookies are governed by the respective privacy policies of those third parties, not by this Cookie Policy. Third-party services we may use include:
          </p>
          <ul className="list-clean">
            <li><strong>Analytics providers:</strong> Such as Google Analytics or similar services, which use cookies to collect anonymous data about website traffic and user behavior. These providers may aggregate data across multiple websites.</li>
            <li><strong>Hosting and infrastructure providers:</strong> Our hosting platform (Vercel) may set cookies related to performance optimization and security.</li>
            <li><strong>Email and marketing tools:</strong> If you interact with email campaigns or embedded forms, the associated service providers may set cookies to track engagement.</li>
          </ul>
          <p>
            We do not control third-party cookies and recommend reviewing the privacy policies of these services for more information about their data practices.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>5. How to Manage Cookies</h2>
          <p>
            You can control and manage cookies in several ways. Please note that disabling certain cookies may affect the functionality of the Site.
          </p>

          <h3>Browser Settings</h3>
          <p>
            Most web browsers allow you to manage cookies through their settings. You can typically find these controls in your browser&apos;s &quot;Settings,&quot; &quot;Preferences,&quot; or &quot;Privacy&quot; menu. Common options include:
          </p>
          <ul className="list-clean">
            <li>Blocking all cookies or only third-party cookies.</li>
            <li>Deleting cookies that have already been set.</li>
            <li>Configuring your browser to notify you when a cookie is being set.</li>
            <li>Browsing in &quot;private&quot; or &quot;incognito&quot; mode, which typically does not store persistent cookies.</li>
          </ul>

          <h3>Analytics Opt-Out</h3>
          <p>
            If we use Google Analytics, you can opt out by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>. Similar opt-out mechanisms may be available for other analytics providers.
          </p>

          <h3>Do Not Track</h3>
          <p>
            Some browsers offer a &quot;Do Not Track&quot; feature. While there is no universal standard for how websites should respond to these signals, we strive to respect your privacy preferences.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>6. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in the cookies we use, the purposes for which we use them, or changes in applicable law. We will post the updated policy on this page and update the &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>7. Contact Us</h2>
          <p>If you have questions about this Cookie Policy or our use of cookies, please contact us:</p>
          <p>
            <strong>HomeStake Capital Inc.</strong><br />
            Email: <a href="mailto:invest@homestakecapital.com">invest@homestakecapital.com</a>
          </p>
          <p>
            For more information about how we handle your personal information, please see our <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
      </section>
    </>
  );
}
