import './globals.css';
import { site } from '../lib/site';
import { Footer, Header } from '../components/layout';

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HomeStake Capital',
    description: 'The public\'s private equity for home services.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
