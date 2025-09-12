'use client'

import { type Locale } from '@/i18n'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export function LanguageSwitcher() {
  const t = useTranslations('Common')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function onSelectChange(nextLocale: Locale) {
    // Remove current locale from pathname
    // Match /en or /zh at the start, handling both /en and /en/ cases
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/') || '/'

    // Ensure the path starts with / but doesn't have double slashes
    const cleanPath = pathWithoutLocale.startsWith('/')
      ? pathWithoutLocale
      : '/' + pathWithoutLocale
    const newPath = `/${nextLocale}${cleanPath === '/' ? '' : cleanPath}`

    router.push(newPath)
  }

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => onSelectChange(e.target.value as Locale)}
        className="min-w-[110px] appearance-none rounded-md border border-zinc-300 bg-white px-4 py-2 text-left text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800"
        aria-label={t('language')}
      >
        <option value="en">🇺🇸 {t('english')}</option>
        <option value="zh">🇨🇳 {t('chinese')}</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-700 dark:text-zinc-300">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )
}
