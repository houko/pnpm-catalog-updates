import glob from 'fast-glob'
import { type Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { Providers } from '@/app/[locale]/providers'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'
import { locales, type Locale } from '@/i18n'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - PCU Documentation',
    default: 'PCU Documentation',
  },
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages({ locale })

  let pages = await glob('**/*.mdx', { cwd: 'src/app/[locale]' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ])
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <div className="w-full">
              <Layout allSections={allSections}>{children}</Layout>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
