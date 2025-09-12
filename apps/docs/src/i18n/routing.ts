import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Always include locale prefix in URLs
  localePrefix: 'always',

  // Path names configuration
  pathnames: {
    '/': '/',
    '/quickstart': '/quickstart',
    '/command-reference': '/command-reference',
    '/configuration': '/configuration',
    '/examples': '/examples',
    '/troubleshooting': '/troubleshooting',
    '/development': '/development',
    '/cicd': '/cicd',
    '/faq': '/faq',
    '/best-practices': '/best-practices',
    '/performance': '/performance',
    '/migration': '/migration',
    '/writing-basics': '/writing-basics',
    '/writing-components': '/writing-components',
    '/writing-code': '/writing-code',
    '/writing-layout': '/writing-layout',
    '/writing-api': '/writing-api',
    '/writing-advanced': '/writing-advanced',
  },
})
