import { PortalDocumentPage } from '../../../../components/portal-ui';

export const metadata = { title: 'HomeStake Capital | Portal Terms' };

export default function PortalTermsPage() {
  return <PortalDocumentPage eyebrow="Portal terms" title="Terms of service for the investor portal" description="Portal-specific terms governing account access, acceptable use, document handling, confidentiality, and informational-only MVP functionality." bullets={['Authorized portal access only','No investment advice via portal UI','Confidential handling of materials','Placeholder workflows pending legal approval']} />;
}
