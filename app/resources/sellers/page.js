import { PageHero } from '../../../components/layout';

export const metadata = {
  title: 'Seller Resources | HomeStake Capital',
  description:
    'Seller education and transition-oriented materials for home service owners considering an exit.',
};

export default function SellerResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Seller resources"
        title="A Transition Education Layer for Owners"
        description="This resource area can hold process explainers, succession guidance, and fit-oriented content for owners who want a more thoughtful alternative to a standard roll-up conversation."
      />
      <section className="section">
        <div className="container grid-3">
          {[
            ['Process explainer', 'Walk through what first contact, fit review, diligence, structure discussions, and transition planning can look like.'],
            ['Fit checklist', 'Clarify the categories, size ranges, and operating traits HomeStake is actually targeting.'],
            ['Owner questions', 'Address confidentiality, legacy, employee continuity, seller involvement, and what changes after close.'],
          ].map(([title, body]) => (
            <div className="card" key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
