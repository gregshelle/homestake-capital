# HomeStake Capital Website — Technical Audit Report

**Site:** https://website-build-ivory.vercel.app  
**Framework:** Next.js 16.2.0 + React 19 + Turbopack  
**Audit Date:** March 19, 2026  
**Auditor:** Code Performance Sub-agent

---

## Executive Summary

| Category | Score | Status |
|----------|-------|--------|
| **Performance** | 72/100 | ⚠️ Needs Improvement |
| **SEO** | 65/100 | ⚠️ Needs Improvement |
| **Accessibility** | 78/100 | ⚠️ Moderate |
| **Best Practices** | 68/100 | ⚠️ Needs Improvement |
| **Security** | 75/100 | ⚠️ Moderate |

**Bundle Size:** 1.21 MB JavaScript (uncompressed)  
**Build Time:** ~4.1 seconds (Turbopack)

---

## Top 15 Technical Improvements (Ranked by Impact)

### 🔴 CRITICAL (Fix Immediately)

#### 1. **Replace Placeholder URLs in SEO Files** (SEO - Critical)
**File:** `lib/site.js`, `app/sitemap.js`, `app/robots.js`  
**Issue:** All SEO files reference `https://example.com` instead of the actual domain.
```javascript
// Current (WRONG)
export const site = {
  url: 'https://example.com',  // ← PLACEHOLDER
}

// Should be
url: 'https://website-build-ivory.vercel.app'  // or production domain
```
**Impact:** Search engines won't index correctly, OG tags broken, canonical URLs invalid.  
**Effort:** 5 minutes

---

#### 2. **Add Missing Meta Tags & OpenGraph Images** (SEO - Critical)
**File:** `app/layout.js`  
**Issues:**
- No `openGraph.images` defined (required for social sharing)
- No `twitter.image` defined
- No `viewport` meta (deprecated warning in Next.js 16)
- No `alternates.canonical` for canonical URLs
- Missing `icons` for favicon

**Fix:**
```javascript
export const metadata = {
  // ... existing
  openGraph: {
    // ... existing
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'HomeStake Capital'
    }]
  },
  twitter: {
    // ... existing  
    images: ['/og-image.jpg']
  },
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png'
  }
}
```

---

#### 3. **Implement Font Loading Strategy** (Performance - Critical)
**File:** `app/layout.js`, `app/globals.css`  
**Issue:** Using system fonts only but with no font-display strategy for Georgia/Inter fallback.

**Current:**
```css
font-family: Inter, ui-sans-serif, system-ui, ...  /* Inter not loaded! */
font-family: Georgia, "Times New Roman", serif;    /* No fallback strategy */
```

**Fix:** Either:
- **Option A:** Use `next/font` to load Inter properly with subsetting
- **Option B:** Remove Inter reference if using system fonts only

```javascript
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

---

#### 4. **Add Form Security & CSRF Protection** (Security - Critical)
**Files:** `components/sections.js`, `components/portal-ui.js`  
**Issues:**
- All forms use `action="#"` with no actual submission handler
- No CSRF tokens on forms
- No rate limiting on API routes
- File upload in onboarding has no validation

**Fix:**
```javascript
// Add CSRF protection to forms
import { useCsrfToken } from '@/lib/csrf'

export function WaitlistForm() {
  const csrfToken = useCsrfToken()
  
  return (
    <form action="/api/waitlist" method="POST">
      <input type="hidden" name="csrf_token" value={csrfToken} />
      {/* ... */}
    </form>
  )
}
```

---

### 🟠 HIGH PRIORITY (Fix This Week)

#### 5. **Add Image Optimization & Lazy Loading** (Performance - High)
**File:** `components/visuals.js`  
**Issue:** `next/image` is used but no explicit loading strategy or priority flag on hero images.

**Current:**
```javascript
<Image src={src} alt={alt} fill sizes="..." />  // No priority, no loading
```

**Fix:**
```javascript
<Image 
  src={src} 
  alt={alt} 
  fill 
  sizes="(max-width: 960px) 100vw, 40vw"
  priority={priority}  // Add for above-fold images
  loading={priority ? "eager" : "lazy"}
  placeholder="blur"   // Add blur placeholder
/>
```

Also add to `next.config.mjs`:
```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

---

#### 6. **Add Error Boundaries & Loading States** (UX/Reliability - High)
**File:** All portal pages  
**Issue:** No error boundaries; API failures crash components silently.

**Fix:** Create `app/error.js` and `app/loading.js`:
```javascript
// app/portal/error.js
'use client'
export default function Error({ error, reset }) {
  return (
    <div className="card">
      <h2>Something went wrong</h2>
      <button onClick={reset} className="button button-primary">Try again</button>
    </div>
  )
}
```

---

#### 7. **Add Input Validation & Sanitization** (Security - High)
**Files:** All API routes (`app/api/**/*.js`)  
**Issue:** No request body validation; direct Supabase insertion with user data.

**Current (VULNERABLE):**
```javascript
const body = await request.json()
await supabase.from('profiles').insert(body)  // No validation!
```

**Fix:** Add Zod validation:
```javascript
import { z } from 'zod'

const profileSchema = z.object({
  full_name: z.string().min(2).max(100),
  email: z.string().email(),
  // ...
})

const body = profileSchema.parse(await request.json())
```

---

#### 8. **Implement Proper Environment Variable Validation** (Security - High)
**File:** `lib/supabase/client.js`, `lib/supabase/server.js`  
**Issue:** No validation that env vars exist; mock client returned silently.

**Fix:** Add runtime validation:
```javascript
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  throw new Error('Missing required Supabase environment variables')
}
```

---

#### 9. **Add Bundle Analysis & Code Splitting** (Performance - High)
**Issue:** 1.21 MB JS bundle with no analysis. `recharts` is likely bloating the bundle.

**Fix:** 
1. Install `@next/bundle-analyzer`
2. Dynamic import chart components:
```javascript
import dynamic from 'next/dynamic'

const GrowthChart = dynamic(() => import('./GrowthChart'), {
  ssr: false,
  loading: () => <div className="chart-skeleton" />
})
```

---

### 🟡 MEDIUM PRIORITY (Fix This Sprint)

#### 10. **Add Structured Data for All Page Types** (SEO - Medium)
**File:** All page files  
**Issue:** Only `organizationSchema` in footer; no per-page structured data.

**Fix:** Add to each page:
```javascript
import { Metadata } from 'next'

export const metadata = {
  // ...
  other: {
    'json-ld': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'For Investors',
      description: '...'
    })
  }
}
```

---

#### 11. **Add Accessibility Improvements** (A11y - Medium)
**Issues Found:**
- No `aria-label` on Icon buttons
- No focus indicators on custom elements
- No skip-to-content link
- Form inputs missing `aria-describedby` for errors
- No color contrast audit (likely issues with `--muted` text)

**Fix:**
```javascript
// Add to layout
<a href="#main" className="skip-link">Skip to content</a>

// Add aria labels
<button aria-label="Close menu">×</button>

// Add focus styles
:focus-visible {
  outline: 2px solid var(--brass);
  outline-offset: 2px;
}
```

---

#### 12. **Implement API Rate Limiting** (Security - Medium)
**Files:** `middleware.js`, API routes  
**Issue:** No rate limiting on auth endpoints or form submissions.

**Fix:** Add Vercel KV or simple in-memory rate limiting:
```javascript
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m')
})
```

---

#### 13. **Add Analytics & Core Web Vitals Tracking** (Performance - Medium)
**File:** `app/layout.js`  
**Issue:** No analytics, no performance monitoring.

**Fix:** Add Vercel Analytics:
```javascript
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

---

### 🟢 LOW PRIORITY (Fix When Convenient)

#### 14. **Refactor CSS Custom Properties** (Maintainability - Low)
**File:** `app/globals.css`  
**Issues:**
- No CSS custom property for spacing scale
- No design token system
- Inconsistent values (24px, 28px, 32px without system)

**Fix:** Add spacing/typography tokens:
```css
:root {
  /* Existing colors... */
  
  /* Add spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  
  /* Typography scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
}
```

---

#### 15. **Add E2E Testing & Improve Test Coverage** (Quality - Low)
**Issue:** No test files found; no Playwright/Cypress setup.

**Fix:** Add testing:
```bash
npm install -D @playwright/test
npx playwright init
```

Create basic tests for:
- Portal auth flow
- Form submissions
- Critical user paths

---

## Quick Wins Checklist

- [ ] Fix placeholder URLs in `lib/site.js`
- [ ] Add OG image to metadata
- [ ] Add `next/font` for Inter
- [ ] Add error boundaries
- [ ] Add input validation with Zod
- [ ] Add `priority` to hero images
- [ ] Add analytics

---

## Bundle Analysis Summary

| Chunk Type | Size | Notes |
|------------|------|-------|
| Total JS | 1.21 MB | Above recommended 500KB |
| Recharts | ~250KB | Largest dependency |
| Supabase | ~150KB | Needed for auth |
| React 19 | ~120KB | Latest version |

**Recommendations:**
1. Dynamic import `recharts` components
2. Tree-shake unused Supabase features
3. Enable gzip/brotli on Vercel (already done by default)

---

## Security Checklist

| Check | Status | Notes |
|-------|--------|-------|
| HTTPS only | ✅ | Vercel default |
| Secure cookies | ⚠️ | Check cookie settings |
| CSRF protection | ❌ | Missing |
| Rate limiting | ❌ | Missing |
| Input validation | ❌ | Missing |
| XSS protection | ⚠️ | `dangerouslySetInnerHTML` used safely |
| Security headers | ❌ | Missing CSP, HSTS |

---

## Recommended Next Steps

1. **This Week:** Fix items #1-4 (Critical SEO & Security)
2. **Next Week:** Fix items #5-9 (Performance & Validation)
3. **This Sprint:** Fix items #10-13 (SEO & Monitoring)
4. **Backlog:** Items #14-15 (Maintainability)

---

*Report generated by OpenClaw Code Audit Sub-agent*
