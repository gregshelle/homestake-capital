import { createClient } from '../../../../lib/supabase/server';
import { profileUpdateSchema, validateRequest } from '../../../../lib/validation';
import { applySecurityChecks } from '../../../../lib/security';

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
      .select('id, full_name, email, phone, entity_name, entity_type, onboarding_step, email_verified, role, created_at')
      .eq('auth_user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return Response.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }

    // Fetch related data
    const { data: accreditation } = await supabase
      .from('accreditation_records')
      .select('*')
      .eq('profile_id', data.id)
      .single();

    const { data: commitment } = await supabase
      .from('investment_commitments')
      .select('*')
      .eq('profile_id', data.id)
      .single();

    return Response.json({ 
      success: true, 
      data: {
        ...data,
        accreditation,
        commitment
      }
    });
  } catch (error) {
    console.error('Profile GET error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function PATCH(request) {
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
    const validation = await validateRequest(request, profileUpdateSchema);
    if (!validation.success) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updateData = {
      ...validation.data,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('auth_user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return Response.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Profile PATCH error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
