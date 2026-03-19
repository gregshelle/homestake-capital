import Link from 'next/link';

export const metadata = {
  title: 'Seller Inquiry Received | HomeStake Capital',
};

export default function SellerThanksPage() {
  return (
    <section className="section">
      <div className="container grid-2">
        <div className="card">
          <span className="eyebrow">Seller inquiry</span>
          <h1>Conversation requested</h1>
          <p>
            This route gives the seller path a complete post-submit flow without implying a live acquisition
            process beyond an initial fit conversation.
          </p>
        </div>
        <div className="card">
          <h2>What happens next</h2>
          <p>
            Early conversations should focus on fit, timing, and whether a more detailed diligence process
            makes sense.
          </p>
          <Link href="/for-business-owners" className="button button-light">Back to seller page</Link>
        </div>
      </div>
    </section>
  );
}
