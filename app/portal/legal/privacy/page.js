import { PortalDocumentPage } from '../../../../components/portal-ui';

export const metadata = { title: 'HomeStake Capital | Portal Privacy' };

export default function PortalPrivacyPage() {
  return <PortalDocumentPage eyebrow="Privacy" title="Privacy policy for investor data" description="Describe collection, storage, review, and retention of investor personal information, accreditation materials, entity records, and communications data." bullets={['Investor identity and entity data','Accreditation documentation handling','Internal admin access controls','Retention and deletion policy placeholder']} />;
}
