import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/portal/login', '/portal/signup', '/portal/verify-email', '/auth/callback'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If user is not authenticated and trying to access a protected portal route
  if (!user && pathname.startsWith('/portal') && !isPublicRoute) {
    return NextResponse.redirect(new URL('/portal/login', request.url));
  }

  // If user is authenticated and trying to access login/signup, redirect to portal
  if (user && (pathname === '/portal/login' || pathname === '/portal/signup')) {
    return NextResponse.redirect(new URL('/portal', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/portal/:path*', '/auth/:path*'],
};
