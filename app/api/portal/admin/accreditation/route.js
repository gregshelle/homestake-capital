import { createClient } from '../../../../../lib/supabase/server';
import { adminAccreditationSchema, validateRequest } from '../../../../../lib/validation';
import { applySecurityChecks } from '../../../../../lib/security';

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
    const validation = await validateRequest(request, adminAccreditationSchema);
    if (!validation.success) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const supabase = await createClient();
    const { accreditation_id, verification_status, reviewer_notes } = validation.data;
    
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

    const { data, error } = await supabase
      .from('accreditation_records')
      .update({
        verification_status,
        reviewer_notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', accreditation_id)
      .select()
      .single();

    if (error) {
      console.error('Error updating accreditation:', error);
      return Response.json({ error: 'Failed to update accreditation' }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Admin accreditation PATCH error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
