import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n-config';
import { LanguageType } from './src/components/LanguageToggle/LanguageToggle';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    request.nextUrl.pathname.includes('/static/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale: LanguageType = i18n.defaultLocale;

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      ),
    );
  }
}

// export const config = {
//   // Matcher ignoring `/_next/` and `/api/`
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
// };
