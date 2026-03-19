export const portalDisclaimer = 'This portal is a staged MVP for legal/compliance review. It is not a live securities offering, not a funding portal, and no payment or signature flow is active.';

export const portalStatus = {
  application: 'In onboarding',
  accreditation: 'Pending third-party review',
  investment: 'Soft-circled commitment only',
};

export const investmentSummary = {
  offeringName: 'HomeStake Capital Holdings I, LP',
  structure: 'Reg D 506(c) — accredited investors only',
  minimum: '$25,000',
  softCommitment: '$100,000',
  targetClose: 'Q3 2026 target close window',
};

export const onboardingSteps = [
  {
    id: 'account',
    step: 'Step 1',
    title: 'Create account',
    status: 'Complete',
    body: 'Investors create a portal account with email/password, confirm their email, and enter profile details.',
  },
  {
    id: 'accreditation',
    step: 'Step 2',
    title: 'Accreditation questionnaire',
    status: 'In progress',
    body: 'Capture self-certification for income, net worth, or professional certification status before review.',
  },
  {
    id: 'verification',
    step: 'Step 3',
    title: 'Verification documents',
    status: 'Waiting',
    body: 'Upload supporting accreditation documents or hand off to a third-party verification provider.',
  },
  {
    id: 'documents',
    step: 'Step 4',
    title: 'Review offering documents',
    status: 'Waiting',
    body: 'Review the PPM, subscription agreement, Form D notice, and risk disclosures before proceeding.',
  },
  {
    id: 'amount',
    step: 'Step 5',
    title: 'Select investment amount',
    status: 'Waiting',
    body: 'Enter a soft commitment amount and confirm entity/individual subscription details.',
  },
  {
    id: 'esign',
    step: 'Step 6',
    title: 'E-signature placeholder',
    status: 'Placeholder',
    body: 'Reserved for DocuSign or similar integration after securities counsel review. Not live.',
  },
  {
    id: 'payment',
    step: 'Step 7',
    title: 'Wire/payment instructions placeholder',
    status: 'Placeholder',
    body: 'Reserved for final funding instructions once subscriptions are approved. No live payment processing.',
  },
];

export const accreditationQuestions = [
  'Income exceeds $200,000 individually or $300,000 jointly with reasonable expectation of the same this year.',
  'Net worth exceeds $1,000,000 individually or jointly excluding primary residence.',
  'Hold a qualifying professional certification or status recognized under SEC accredited investor rules.',
];

export const documents = [
  { title: 'Private Placement Memorandum', type: 'PPM', status: 'Draft for counsel review', href: '/portal/documents/ppm' },
  { title: 'Subscription Agreement', type: 'Agreement', status: 'Draft for counsel review', href: '/portal/documents/subscription-agreement' },
  { title: 'Form D Filing Summary', type: 'Regulatory', status: 'Preview copy', href: '/portal/documents/form-d' },
  { title: 'Quarterly Company Update', type: 'Update', status: 'Sample investor update', href: '/portal/documents/company-updates' },
];

export const crmInvestors = [
  { name: 'Avery Thompson', entity: 'Thompson Family Office', accreditation: 'Verified — CPA letter received', commitment: '$250,000', stage: 'Docs reviewed', owner: 'IR team' },
  { name: 'Jordan Patel', entity: 'Individual', accreditation: 'Self-certified — docs pending', commitment: '$50,000', stage: 'Questionnaire complete', owner: 'Compliance' },
  { name: 'Morgan Lee', entity: 'Lee Capital LLC', accreditation: '3rd-party verification requested', commitment: '$150,000', stage: 'Awaiting verification', owner: 'Investor ops' },
];

export const adminDocuments = [
  { name: 'PPM_v0.7.pdf', audience: 'Prospects + investors', status: 'Draft', updated: '2026-03-15' },
  { name: 'Subscription_Agreement_v0.5.pdf', audience: 'Approved investors', status: 'Draft', updated: '2026-03-16' },
  { name: 'Risk_Disclosures_v0.3.pdf', audience: 'Public portal', status: 'Ready', updated: '2026-03-12' },
  { name: 'March_Investor_Update.pdf', audience: 'Existing investors', status: 'Ready', updated: '2026-03-17' },
];

export const databaseTables = [
  ['profiles', 'Portal user profile, role, contact info, and onboarding state'],
  ['accreditation_records', 'Self-certification answers, verification path, reviewer status, timestamps'],
  ['investment_commitments', 'Soft commitments, minimums, entity type, and funding status placeholders'],
  ['documents', 'Portal-visible documents, versioning, audience, and storage metadata'],
  ['admin_users', 'Admin role mapping and internal CRM access flags'],
  ['crm_notes', 'Internal investor relationship notes and action items'],
];
