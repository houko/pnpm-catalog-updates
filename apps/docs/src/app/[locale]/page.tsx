'use client'

import { Button } from '@/components/Button'
import { Guides } from '@/components/Guides'
import { HeroPattern } from '@/components/HeroPattern'
import { Resources } from '@/components/Resources'
import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('Home')
  const tCommon = useTranslations('Common')

  return (
    <>
      <HeroPattern />

      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
        {t('title')}
      </h1>

      <p className="lead mt-4 text-xl text-zinc-600 dark:text-zinc-400">{t('description')}</p>

      <div className="not-prose mb-16 mt-6 flex gap-3">
        <Button href="/quickstart" arrow="right">
          <>{tCommon('getStarted')}</>
        </Button>
        <Button href="/command-reference" variant="outline">
          <>{t('exploreSdks')}</>
        </Button>
      </div>

      <h2
        id="getting-started"
        className="mb-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white"
      >
        {t('gettingStartedTitle')}
      </h2>

      <p className="lead mb-6 text-xl text-zinc-600 dark:text-zinc-400">
        {t('gettingStartedDesc')}
      </p>

      <div className="not-prose mb-16">
        <Button href="/quickstart" variant="text" arrow="right">
          <>{t('getApiKey')}</>
        </Button>
      </div>

      <Guides />
      <Resources />
    </>
  )
}
