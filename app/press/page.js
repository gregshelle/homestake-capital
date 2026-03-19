import { PageHero } from '../../components/layout';

export const metadata = {
  title: 'Press and Media Kit | HomeStake Capital',
  description:
    'Press page and media-ready boilerplate for HomeStake Capital.',
};

export default function PressPage() {
  return (
    <>
      <PageHero
        eyebrow="Press"
        title="Boilerplate and Media Context"
        description="A simple press surface helps HomeStake route interviews, podcasts, and media questions without improvising the same explanation each time."
      />
      <section className="section">
        <div className="container grid-2">
          <div className="card">
            <h2>Company boilerplate</h2>
            <p>
              HomeStake Capital is building a Delaware C-Corp holding company focused on acquiring and
              growing home service businesses, while presenting a more open and transparent ownership story
              than traditional private equity.
            </p>
          </div>
          <div className="card">
            <h2>Media routing</h2>
            <p>
              Use the contact page for interview requests, speaking inquiries, founder background questions,
              or requests for updated boilerplate, logos, and approved brand assets.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
