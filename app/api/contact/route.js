import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

const contactSchema = z.object({
  name: z.string().min(1, 'Full name is required.').max(200),
  email: z.string().email('Please enter a valid email address.'),
  inquiry_type: z.string().max(50).optional().default(''),
  message: z.string().min(1, 'Message is required.').max(5000),
});

export async function POST(request) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors = result.error.issues.map((i) => i.message).join(', ');
      return NextResponse.json(
        { error: fieldErrors },
        { status: 400, headers: { 'X-RateLimit-Limit': '10', 'X-RateLimit-Remaining': '9' } }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(result.data)
      .select()
      .single();

    if (error) {
      console.error('Contact insert error:', error);
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
    console.error('Contact route error:', err);
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 }
    );
  }
}
