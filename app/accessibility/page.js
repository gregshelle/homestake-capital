export const metadata = {
  title: 'Accessibility Statement | HomeStake Capital',
  description:
    'Accessibility statement for the HomeStake Capital website and investor portal preview.',
};

export default function AccessibilityPage() {
  return (
    <section className="section">
      <div className="container grid-2">
        <div className="card">
          <span className="eyebrow">Accessibility</span>
          <h1>Accessibility Statement</h1>
          <p>
            HomeStake Capital is building its public website and portal preview to be readable, navigable,
            and usable across common devices and assistive technologies.
          </p>
          <p>
            Current MVP priorities include semantic page structure, keyboard-accessible navigation, readable
            contrast, and responsive layouts across core investor and seller flows.
          </p>
        </div>
        <div className="card">
          <h2>How to report an issue</h2>
          <p>
            If you encounter an accessibility barrier, use the contact page and include the page, browser,
            device, and issue you observed so it can be reproduced and fixed.
          </p>
        </div>
      </div>
    </section>
  );
}
