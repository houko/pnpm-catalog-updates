import createMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './src/i18n'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Prefix strategy - always means all locales have prefix
  localePrefix: 'always',
})

export const config = {
  // Only exclude Next.js internals, match everything else
  matcher: [
    // Match all paths except Next.js internals
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Explicitly match root path
    '/',
  ],
}
