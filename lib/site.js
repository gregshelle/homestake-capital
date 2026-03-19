export const site = {
  name: 'HomeStake Capital',
  url: 'https://example.com',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/for-investors', label: 'For Investors' },
    { href: '/for-business-owners', label: 'For Business Owners' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/resources', label: 'Resources' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/cookies', label: 'Cookies' },
    { href: '/disclosures', label: 'Disclosures' },
    { href: '/accessibility', label: 'Accessibility' },
  ],
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HomeStake Capital',
  url: site.url,
  description:
    'HomeStake Capital is building the public\'s private equity platform for home services.',
};
