import { PortalDocumentPage } from '../../../../components/portal-ui';

export const metadata = { title: 'HomeStake Capital | Form D' };

export default function FormDPage() {
  return <PortalDocumentPage eyebrow="Regulatory" title="Form D filing summary" description="Portal summary page for the exempt offering notice typically filed in connection with a Rule 506 offering." bullets={['Issuer identification summary','Exemption reliance and jurisdictions','Executive and promoter disclosure summary','Compliance checklist placeholder']} />;
}
