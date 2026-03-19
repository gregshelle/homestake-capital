import { createClient } from '../../../../../lib/supabase/server';
import { applySecurityChecks } from '../../../../../lib/security';

export async function GET(request) {
  // Apply basic security checks
  const securityCheck = await applySecurityChecks(request, {
    requireCsrf: false,
    requireOrigin: true
  });
  
  if (!securityCheck.passed) {
    return securityCheck.response;
  }

  try {
    const supabase = await createClient();
    
    // Check if user is admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('auth_user_id', user.id)
      .single();

    if (profileError || profile?.role !== 'admin') {
      return Response.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    // Fetch all investors with their data
    const { data: investors, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, entity_name, onboarding_step, email_verified, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching investors:', error);
      return Response.json({ error: 'Failed to fetch investors' }, { status: 500 });
    }

    // Fetch accreditation data for all investors
    const { data: accreditations } = await supabase
      .from('accreditation_records')
      .select('*');

    // Fetch commitment data for all investors
    const { data: commitments } = await supabase
      .from('investment_commitments')
      .select('*');

    const enrichedInvestors = investors.map(inv => ({
      ...inv,
      accreditation: accreditations?.find(a => a.profile_id === inv.id) || null,
      commitment: commitments?.find(c => c.profile_id === inv.id) || null
    }));

    return Response.json({ success: true, data: enrichedInvestors });
  } catch (error) {
    console.error('Admin investors GET error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
