import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

const waitlistSchema = z.object({
  first_name: z.string().max(100).optional().default(''),
  email: z.string().email('Please enter a valid email address.'),
  country: z.string().max(200).optional().default(''),
  interest: z.string().max(50).optional().default(''),
});

export async function POST(request) {
  try {
    const body = await request.json();

    const result = waitlistSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors = result.error.issues.map((i) => i.message).join(', ');
      return NextResponse.json(
        { error: fieldErrors },
        { status: 400, headers: { 'X-RateLimit-Limit': '10', 'X-RateLimit-Remaining': '9' } }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('waitlist')
      .insert(result.data)
      .select()
      .single();

    if (error) {
      // Handle duplicate email gracefully
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist.' },
          { status: 409, headers: { 'X-RateLimit-Limit': '10', 'X-RateLimit-Remaining': '9' } }
        );
      }
      console.error('Waitlist insert error:', error);
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: data.id },
      { status: 201, headers: { 'X-RateLimit-Limit': '10', 'X-RateLimit-Remaining': '9' } }
    );
  } catch (err) {
    console.error('Waitlist route error:', err);
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 }
    );
  }
}
