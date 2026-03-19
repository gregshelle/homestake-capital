import { createClient } from '../../../../lib/supabase/server';
import { accreditationSchema, validateRequest } from '../../../../lib/validation';
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
    const validation = await validateRequest(request, accreditationSchema);
    if (!validation.success) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the profile_id for the current user
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (profileError || !profile) {
      return Response.json({ error: 'Profile not found' }, { status: 404 });
    }

    const { 
      qualification_path, 
      income_qualified, 
      net_worth_qualified, 
      certification_qualified,
      verification_method 
    } = validation.data;

    // Check if accreditation record exists
    const { data: existingRecord } = await supabase
      .from('accreditation_records')
      .select('id')
      .eq('profile_id', profile.id)
      .single();

    let result;
    if (existingRecord) {
      // Update existing record
      result = await supabase
        .from('accreditation_records')
        .update({
          qualification_path: qualification_path || '',
          income_qualified: income_qualified || false,
          net_worth_qualified: net_worth_qualified || false,
          certification_qualified: certification_qualified || false,
          verification_method: verification_method || 'self_certified',
          updated_at: new Date().toISOString()
        })
        .eq('id', existingRecord.id)
        .select()
        .single();
    } else {
      // Create new record
      result = await supabase
        .from('accreditation_records')
        .insert({
          profile_id: profile.id,
          qualification_path: qualification_path || '',
          income_qualified: income_qualified || false,
          net_worth_qualified: net_worth_qualified || false,
          certification_qualified: certification_qualified || false,
          verification_method: verification_method || 'self_certified',
          verification_status: 'pending'
        })
        .select()
        .single();
    }

    if (result.error) {
      console.error('Error saving accreditation:', result.error);
      return Response.json({ error: 'Failed to save accreditation' }, { status: 500 });
    }

    // Update onboarding step
    await supabase
      .from('profiles')
      .update({ onboarding_step: 'accreditation_complete' })
      .eq('id', profile.id);

    return Response.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Accreditation API error:', error);
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
      .from('accreditation_records')
      .select('*')
      .eq('profile_id', profile.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching accreditation:', error);
      return Response.json({ error: 'Failed to fetch accreditation' }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Accreditation GET error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
