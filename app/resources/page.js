import Link from 'next/link';
import { PageHero } from '../../components/layout';

const resourceCards = [
  {
    title: 'Investor education',
    body: 'Plain-English explainers on the HomeStake model, onboarding path, and portal expectations.',
    href: '/resources/investor-education',
  },
  {
    title: 'Seller resources',
    body: 'Transition-oriented material for owners thinking about succession, fit, and process.',
    href: '/resources/sellers',
  },
  {
    title: 'Blog and updates',
    body: 'A template surface for market notes, founder memos, and launch updates.',
    href: '/resources/blog',
  },
  {
    title: 'Press and media kit',
    body: 'Basic boilerplate and contact routing for interviews, podcasts, and media requests.',
    href: '/press',
  },
];

export const metadata = {
  title: 'Resources | HomeStake Capital',
  description:
    'Educational resources, investor explainers, seller materials, and HomeStake Capital updates.',
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="A Home for Explainers, Updates, and Context"
        description="HomeStake should not ask people to trust a complex model without helping them understand it. This resource hub is the home for that education layer."
      />
      <section className="section">
        <div className="container grid-2">
          {resourceCards.map((card) => (
            <div className="card" key={card.title}>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
              <Link href={card.href} className="button button-light">Open page</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
