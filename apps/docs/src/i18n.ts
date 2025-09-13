import { getRequestConfig } from 'next-intl/server'

export const locales = ['en', 'zh', 'ja', 'es', 'de', 'fr', 'ko'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export default getRequestConfig(async ({ locale }) => {
  // Fallback to default locale if undefined
  const actualLocale = locale || defaultLocale

  return {
    locale: actualLocale,
    messages: (await import(`../messages/${actualLocale}.json`)).default,
  }
})
