import { createClient } from '../../../../lib/supabase/server';
import { onboardingSchema, validateRequest } from '../../../../lib/validation';
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
    const validation = await validateRequest(request, onboardingSchema);
    if (!validation.success) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const supabase = await createClient();
    const body = validation.data;
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { onboarding_step } = body;
    const extraData = Object.fromEntries(
      Object.entries(body).filter(([key]) => key !== 'onboarding_step')
    );

    // Update the profile with the new onboarding step
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        onboarding_step,
        updated_at: new Date().toISOString(),
        ...extraData
      })
      .eq('auth_user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating onboarding step:', error);
      return Response.json({ error: 'Failed to update onboarding step' }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Onboarding API error:', error);
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

    const { data, error } = await supabase
      .from('profiles')
      .select('onboarding_step, full_name, email, email_verified, entity_name, entity_type')
      .eq('auth_user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching onboarding status:', error);
      return Response.json({ error: 'Failed to fetch onboarding status' }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Onboarding GET error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
