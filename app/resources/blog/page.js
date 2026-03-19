import Link from 'next/link';
import { PageHero } from '../../../components/layout';

const posts = [
  {
    slug: 'why-home-services',
    title: 'Why Home Services Attract Serious Buyers',
    excerpt:
      'A category note on fragmentation, recurring demand, and why disciplined operators keep returning to this market.',
  },
  {
    slug: 'what-investor-transparency-should-look-like',
    title: 'What Investor Transparency Should Look Like',
    excerpt:
      'Why dashboards, document rooms, and plain-English updates matter more than cosmetic polish in a trust-heavy capital product.',
  },
  {
    slug: 'a-better-exit-than-the-standard-roll-up',
    title: 'A Better Exit Than the Standard Roll-Up',
    excerpt:
      'How HomeStake wants to frame continuity, seller respect, and transition planning for owners considering the next chapter.',
  },
];

export const metadata = {
  title: 'Blog | HomeStake Capital',
  description: 'Category explainers, launch updates, and HomeStake Capital thought pieces.',
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Founding Notes, Category Explainers, and Launch Updates"
        description="This template hub gives HomeStake an SEO and education surface without forcing a fully staffed content operation on day one."
      />
      <section className="section">
        <div className="container portal-stack">
          {posts.map((post) => (
            <article className="card" key={post.slug}>
              <span className="eyebrow">Template article</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link href={`/resources/blog/${post.slug}`} className="button button-light">Read template</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
