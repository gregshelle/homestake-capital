import { PortalDocumentPage } from '../../../../components/portal-ui';

export const metadata = { title: 'HomeStake Capital | Risk Disclosures' };

export default function RiskDisclosuresPage() {
  return <PortalDocumentPage eyebrow="Risk" title="Risk disclosures" description="Summary page for concentration, illiquidity, execution, integration, leverage, and regulatory risks associated with the proposed offering." bullets={['Illiquid and speculative investment risk','Execution and acquisition integration risk','Regulatory/compliance risk','No assurance of returns or liquidity events']} />;
}
