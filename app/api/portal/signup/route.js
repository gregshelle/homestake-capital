import { createClient } from '../../../../lib/supabase/server';
import { signupSchema, validateRequest } from '../../../../lib/validation';
import { applySecurityChecks } from '../../../../lib/security';
import { site } from '../../../../lib/site';

export async function POST(request) {
  // Apply security checks including rate limiting for auth endpoints
  const securityCheck = await applySecurityChecks(request, {
    requireCsrf: true,
    requireOrigin: true,
    rateLimitId: 'signup'
  });
  
  if (!securityCheck.passed) {
    return securityCheck.response;
  }

  try {
    // Validate request body
    const validation = await validateRequest(request, signupSchema);
    if (!validation.success) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const supabase = await createClient();
    const { email, password, full_name } = validation.data;

    // Create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name },
        emailRedirectTo: `${site.url}/auth/callback`
      }
    });

    if (authError) {
      return Response.json({ error: authError.message }, { status: 400 });
    }

    if (authData.user) {
      // Create the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          auth_user_id: authData.user.id,
          email: email,
          full_name: full_name,
          onboarding_step: 'account_created',
          email_verified: false
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
        return Response.json({ error: 'Failed to create profile' }, { status: 500 });
      }
    }

    return Response.json({ 
      success: true, 
      message: 'Account created. Please check your email to verify your account.'
    });
  } catch (error) {
    console.error('Signup API error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
