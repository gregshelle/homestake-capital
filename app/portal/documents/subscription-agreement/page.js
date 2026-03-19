import { PortalDocumentPage } from '../../../../components/portal-ui';

export const metadata = { title: 'HomeStake Capital | Subscription Agreement' };

export default function SubscriptionAgreementPage() {
  return <PortalDocumentPage eyebrow="Subscription" title="Subscription Agreement" description="Capture investor representations, entity details, suitability acknowledgements, and commitment information prior to final legal signature routing." bullets={['Subscriber identity and capacity','Accredited investor reps and warranties','Commitment amount and subscription mechanics','Attorney-reviewed signature package placeholder']} />;
}
