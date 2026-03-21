import { site } from '../lib/site';

export default function sitemap() {
  const base = site.url;
  const pages = [
    '',
    '/about',
    '/how-it-works',
    '/for-investors',
    '/for-business-owners',
    '/sell-your-business',
    '/waitlist',
    '/faq',
    '/contact',
    '/portfolio',
    '/portal',
    '/portal/login',
    '/portal/signup',
    '/portal/verify-email',
    '/portal/onboarding',
    '/portal/documents',
    '/portal/documents/ppm',
    '/portal/documents/subscription-agreement',
    '/portal/documents/form-d',
    '/portal/documents/company-updates',
    '/portal/legal/risk-disclosures',
    '/portal/legal/terms',
    '/portal/legal/privacy',
    '/portal/settings',
    '/portal/admin',
    '/privacy',
    '/terms',
    '/cookies',
    '/disclosures',
  ];

  return pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
