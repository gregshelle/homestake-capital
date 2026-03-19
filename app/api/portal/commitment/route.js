import { createClient } from '../../../../lib/supabase/server';
import { commitmentSchema, validateRequest } from '../../../../lib/validation';
import { applySecurityChecks } from '../../../../lib/security';

export async function POST(request) {
  // Apply security checks
  const securityCheck = await applySecurityChecks(request, {
    requireCsrf: true,
    requireOrigin: true
  });
  
  if (!securityCheck.passed) {
    return securityCheck.response;
  }

  try {
    // Validate request body
    const validation = await validateRequest(request, commitmentSchema);
    if (!validation.success) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (profileError || !profile) {
      return Response.json({ error: 'Profile not found' }, { status: 404 });
    }

    const { investment_amount, offering_name } = validation.data;

    // Check if commitment exists
    const { data: existingCommitment } = await supabase
      .from('investment_commitments')
      .select('id')
      .eq('profile_id', profile.id)
      .single();

    let result;
    if (existingCommitment) {
      result = await supabase
        .from('investment_commitments')
        .update({
          investment_amount,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingCommitment.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('investment_commitments')
        .insert({
          profile_id: profile.id,
          offering_name: offering_name || 'HomeStake Capital Holdings I, LP',
          investment_amount,
          commitment_status: 'soft_circled'
        })
        .select()
        .single();
    }

    if (result.error) {
      console.error('Error saving commitment:', result.error);
      return Response.json({ error: 'Failed to save commitment' }, { status: 500 });
    }

    // Update onboarding step
    await supabase
      .from('profiles')
      .update({ onboarding_step: 'commitment_submitted' })
      .eq('id', profile.id);

    return Response.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Commitment API error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

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
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (profileError || !profile) {
      return Response.json({ error: 'Profile not found' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('investment_commitments')
      .select('*')
      .eq('profile_id', profile.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching commitment:', error);
      return Response.json({ error: 'Failed to fetch commitment' }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Commitment GET error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
