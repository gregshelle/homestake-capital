import Link from 'next/link';

export default async function BlogArticleTemplate({ params }) {
  const { slug } = await params;
  const prettyTitle = slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return (
    <section className="section">
      <div className="container portal-stack">
        <div className="card">
          <span className="eyebrow">Blog template</span>
          <h1>{prettyTitle}</h1>
          <p>
            This dynamic article template is included so HomeStake can publish category explainers and launch
            notes without restructuring the site later. Live editorial content should be reviewed before
            publication if it references investment terms, returns, or active offerings.
          </p>
        </div>
        <div className="card">
          <h2>Suggested article structure</h2>
          <ul className="list-clean">
            <li>Lead with a clear thesis, not a vague narrative opener.</li>
            <li>Explain the category or workflow in plain English.</li>
            <li>Use sober, reviewable language for anything investment-adjacent.</li>
            <li>Route readers to the waitlist, FAQ, or contact page for next steps.</li>
          </ul>
          <Link href="/resources/blog" className="button button-light">Back to blog</Link>
        </div>
      </div>
    </section>
  );
}
