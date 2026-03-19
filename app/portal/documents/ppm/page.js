import { PortalDocumentPage } from '../../../../components/portal-ui';

export const metadata = { title: 'HomeStake Capital | PPM' };

export default function PpmPage() {
  return <PortalDocumentPage eyebrow="PPM" title="Private Placement Memorandum" description="Review the proposed fund structure, risk factors, use of proceeds, governance, fees, conflicts, and investor suitability language for the Reg D 506(c) portal experience." bullets={['Issuer and offering structure overview','Accredited investor suitability framing','Risk factors and conflicts disclosures','Operational strategy and use-of-proceeds summary']} />;
}
