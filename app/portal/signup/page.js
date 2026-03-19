import { AuthCard } from '../../../components/portal-ui';

export const metadata = {
  title: 'HomeStake Capital | Create Account',
  description: 'Create your secure investor portal account for HomeStake Capital.',
};

export default function PortalSignupPage() {
  return <AuthCard mode="signup" />;
}
