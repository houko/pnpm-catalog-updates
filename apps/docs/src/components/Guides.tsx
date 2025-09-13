'use client'

import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { useTranslations } from 'next-intl'

export function Guides() {
  const t = useTranslations('Guides')

  const guides = [
    {
      href: '/command-reference' as const,
      name: t('commandReference.name'),
      description: t('commandReference.description'),
    },
    {
      href: '/configuration' as const,
      name: t('configuration.name'),
      description: t('configuration.description'),
    },
    {
      href: '/troubleshooting' as const,
      name: t('troubleshooting.name'),
      description: t('troubleshooting.description'),
    },
    {
      href: '/examples' as const,
      name: t('examples.name'),
      description: t('examples.description'),
    },
  ]

  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
        {t('title')}
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{guide.name}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{guide.description}</p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                {t('readMore')}
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
