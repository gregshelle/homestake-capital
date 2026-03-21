import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

const sellerSchema = z.object({
  name: z.string().min(1, 'Owner name is required.').max(200),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().max(30).optional().default(''),
  business_name: z.string().min(1, 'Company name is required.').max(300),
  business_type: z.string().max(200).optional().default(''),
  revenue: z.string().max(100).optional().default(''),
  message: z.string().max(5000).optional().default(''),
});

export async function POST(request) {
  try {
    const body = await request.json();

    const result = sellerSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors = result.error.issues.map((i) => i.message).join(', ');
      return NextResponse.json(
        { error: fieldErrors },
        { status: 400, headers: { 'X-RateLimit-Limit': '10', 'X-RateLimit-Remaining': '9' } }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('seller_inquiries')
      .insert(result.data)
      .select()
      .single();

    if (error) {
      console.error('Seller inquiry insert error:', error);
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
    console.error('Seller route error:', err);
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 }
    );
  }
}
