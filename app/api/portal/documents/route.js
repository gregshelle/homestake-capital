import { createClient } from '../../../../lib/supabase/server';
import { documentViewSchema, validateRequest } from '../../../../lib/validation';
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

    // Get all published documents
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching documents:', error);
      return Response.json({ error: 'Failed to fetch documents' }, { status: 500 });
    }

    // Get profile for document tracking
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    // Fetch document views/acceptances for this user
    let documentViews = [];
    if (profile) {
      const { data: views } = await supabase
        .from('document_views')
        .select('*')
        .eq('profile_id', profile.id);
      documentViews = views || [];
    }

    return Response.json({ 
      success: true, 
      data: documents.map(doc => ({
        ...doc,
        viewed: documentViews.some(v => v.document_id === doc.id),
        accepted: documentViews.some(v => v.document_id === doc.id && v.accepted)
      }))
    });
  } catch (error) {
    console.error('Documents GET error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

// Track document view
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
    const validation = await validateRequest(request, documentViewSchema);
    if (!validation.success) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const supabase = await createClient();
    const { document_id, accepted } = validation.data;
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (!profile) {
      return Response.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Upsert document view
    const { data, error } = await supabase
      .from('document_views')
      .upsert({
        profile_id: profile.id,
        document_id,
        viewed_at: new Date().toISOString(),
        accepted: accepted || false,
        accepted_at: accepted ? new Date().toISOString() : null
      }, {
        onConflict: 'profile_id,document_id'
      })
      .select()
      .single();

    if (error) {
      console.error('Error tracking document view:', error);
      return Response.json({ error: 'Failed to track document view' }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Document view tracking error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
