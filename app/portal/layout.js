import { PortalShell } from '../../components/portal-shell';
import { PortalGate } from '../../components/portal-ui';

export const metadata = {
  title: 'HomeStake Capital | Investor Portal',
  description: 'Investor portal for accredited investor onboarding, documents, commitments, and admin review.',
};

export default function PortalLayout({ children }) {
  return <PortalShell><PortalGate>{children}</PortalGate></PortalShell>;
}
