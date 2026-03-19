import './globals.css';
import { Inter } from 'next/font/google';
import { site } from '../lib/site';
import { Footer, Header } from '../components/layout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: 'HomeStake Capital | The Public\'s Private Equity for Home Services',
  description:
    'HomeStake Capital is building a community-first platform to acquire and grow home service businesses across North America. Join the waitlist or explore a seller-friendly exit path.',
  openGraph: {
    title: 'HomeStake Capital',
    description:
      'The public\'s private equity for home services.',
    url: site.url,
    siteName: 'HomeStake Capital',
    type: 'website',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'HomeStake Capital - The Public\'s Private Equity for Home Services'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HomeStake Capital',
    description: 'The public\'s private equity for home services.',
    images: ['/og-image.jpg']
  },
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
