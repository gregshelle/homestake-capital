import { cookies } from 'next/headers';
import { site } from './site';

// Simple in-memory rate limiting store (use Redis in production)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // Max 5 requests per minute per IP

/**
 * Generate a CSRF token
 */
export function generateCsrfToken() {
  return crypto.randomUUID();
}

/**
 * Set CSRF token in cookie
 */
export async function setCsrfCookie() {
  const token = generateCsrfToken();
  const cookieStore = await cookies();
  cookieStore.set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  });
  return token;
}

/**
 * Verify CSRF token from request
 */
export async function verifyCsrfToken(request) {
  // Skip CSRF check for GET requests
  if (request.method === 'GET') return { valid: true };
  
  try {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get('csrf_token')?.value;
    
    const body = await request.clone().json();
    const headerToken = request.headers.get('x-csrf-token');
    const bodyToken = body?.csrf_token;
    const token = headerToken || bodyToken;
    
    if (!cookieToken || !token || cookieToken !== token) {
      return { valid: false, error: 'Invalid CSRF token' };
    }
    
    return { valid: true };
  } catch {
    return { valid: false, error: 'CSRF verification failed' };
  }
}

/**
 * Check origin header for security
 */
export function checkOrigin(request) {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // Allow requests with no origin (same-origin, mobile apps)
  if (!origin) return { valid: true };
  
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    site.url
  ];
  
  const isAllowed = allowedOrigins.some(allowed => 
    origin.startsWith(allowed) || (referer && referer.startsWith(allowed))
  );
  
  if (!isAllowed) {
    return { valid: false, error: 'Origin not allowed' };
  }
  
  return { valid: true };
}

/**
 * Rate limiting for auth endpoints
 */
export async function rateLimit(request, identifier) {
  const now = Date.now();
  const key = `${identifier}:${request.headers.get('x-forwarded-for') || 'unknown'}`;
  
  const record = rateLimitStore.get(key);
  
  if (!record || now - record.resetTime > RATE_LIMIT_WINDOW) {
    // New window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }
  
  if (record.count >= MAX_REQUESTS) {
    return { 
      allowed: false, 
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    };
  }
  
  record.count++;
  rateLimitStore.set(key, record);
  
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}

/**
 * Apply security checks to API route
 */
export async function applySecurityChecks(request, options = {}) {
  const { requireCsrf = true, requireOrigin = true, rateLimitId = null } = options;
  
  // Check origin
  if (requireOrigin) {
    const originCheck = checkOrigin(request);
    if (!originCheck.valid) {
      return { 
        passed: false, 
        response: Response.json({ error: originCheck.error }, { status: 403 }) 
      };
    }
  }
  
  // Check CSRF
  if (requireCsrf && request.method !== 'GET') {
    const csrfCheck = await verifyCsrfToken(request);
    if (!csrfCheck.valid) {
      return { 
        passed: false, 
        response: Response.json({ error: csrfCheck.error }, { status: 403 }) 
      };
    }
  }
  
  // Check rate limit
  if (rateLimitId) {
    const limitCheck = await rateLimit(request, rateLimitId);
    if (!limitCheck.allowed) {
      return { 
        passed: false, 
        response: Response.json(
          { error: limitCheck.error, retryAfter: limitCheck.retryAfter }, 
          { status: 429, headers: { 'Retry-After': limitCheck.retryAfter.toString() } }
        ) 
      };
    }
  }
  
  return { passed: true };
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes
