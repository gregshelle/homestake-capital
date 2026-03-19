import { z } from 'zod';

// Input validation schemas for API routes
export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128, 'Password too long'),
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long').trim(),
});

export const profileUpdateSchema = z.object({
  full_name: z.string().min(2).max(100).trim().optional(),
  phone: z.string().max(50).optional().nullable(),
  entity_name: z.string().max(200).optional().nullable(),
  entity_type: z.enum(['individual', 'entity']).optional(),
});

export const onboardingSchema = z.object({
  onboarding_step: z.enum([
    'account_created',
    'profile_complete',
    'accreditation_complete',
    'documents_uploaded',
    'documents_reviewed',
    'commitment_submitted'
  ]),
}).catchall(z.unknown());

export const accreditationSchema = z.object({
  qualification_path: z.enum(['income', 'net_worth', 'certification', '']).optional(),
  income_qualified: z.boolean().optional(),
  net_worth_qualified: z.boolean().optional(),
  certification_qualified: z.boolean().optional(),
  verification_method: z.enum(['self_certified', 'third_party', '']).optional(),
});

export const commitmentSchema = z.object({
  investment_amount: z.number().min(25000, 'Minimum investment is $25,000').max(10000000, 'Investment amount too large'),
  offering_name: z.string().max(200).optional(),
});

export const documentViewSchema = z.object({
  document_id: z.string().uuid('Invalid document ID'),
  accepted: z.boolean().optional(),
});

export const adminAccreditationSchema = z.object({
  accreditation_id: z.string().uuid('Invalid accreditation ID'),
  verification_status: z.enum(['pending', 'verified', 'rejected']).optional(),
  reviewer_notes: z.string().max(1000).optional(),
});

// Sanitization helper
export function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .trim();
}

// Validate request body
export async function validateRequest(request, schema) {
  try {
    const body = await request.json();
    const validated = schema.parse(body);
    return { success: true, data: validated, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, data: null, error: messages };
    }
    return { success: false, data: null, error: 'Invalid request body' };
  }
}
