import { AuthCard } from '../../../components/portal-ui';

export const metadata = {
  title: 'HomeStake Capital | Investor Portal Login',
  description: 'Secure investor portal login for HomeStake Capital. Access your investment dashboard, documents, and accreditation status.',
};

export default function PortalLoginPage() {
  return (
    <div className="portal-login-page">
      <AuthCard mode="login" />
    </div>
  );
}
