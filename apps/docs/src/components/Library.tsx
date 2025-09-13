import Image, { type StaticImageData } from 'next/image'

import { Button } from '@/components/Button'
import logoGo from '@/images/logos/go.svg'
import logoNode from '@/images/logos/node.svg'
import logoPhp from '@/images/logos/php.svg'
import logoPython from '@/images/logos/python.svg'
import logoRuby from '@/images/logos/ruby.svg'
import { isValidRoute } from '@/utils/routing'

export const libraryData = {
  php: {
    href: undefined as string | undefined,
    name: 'PHP',
    description:
      'A popular general-purpose scripting language that is especially suited to web development.',
    logo: logoPhp,
  },
  ruby: {
    href: undefined as string | undefined,
    name: 'Ruby',
    description:
      'A dynamic, open source programming language with a focus on simplicity and productivity.',
    logo: logoRuby,
  },
  node: {
    href: undefined as string | undefined,
    name: 'Node.js',
    description: 'Node.js® is an open-source, cross-platform JavaScript runtime environment.',
    logo: logoNode,
  },
  python: {
    href: undefined as string | undefined,
    name: 'Python',
    description:
      'Python is a programming language that lets you work quickly and integrate systems more effectively.',
    logo: logoPython,
  },
  go: {
    href: undefined as string | undefined,
    name: 'Go',
    description:
      'An open-source programming language supported by Google with built-in concurrency.',
    logo: logoGo,
  },
}

export function Library({
  language = 'node',
  showDescription = true,
  compact = false,
  href,
  description,
  logo,
}: {
  language?: 'php' | 'ruby' | 'node' | 'python' | 'go'
  showDescription?: boolean
  compact?: boolean
  href?: string
  description?: string
  logo?: StaticImageData
}) {
  const library = libraryData[language]

  if (compact) {
    if (!showDescription) {
      // 无描述的compact：上下结构
      return (
        <div className="inline-flex w-[150px] flex-col items-center gap-1 rounded-lg border border-zinc-200 px-6 py-2 dark:border-zinc-700">
          <Image src={logo || library.logo} alt="" className="h-10 w-10" unoptimized />
          <div className="text-center">
            <span className="truncate text-xs font-semibold text-zinc-900 dark:text-white">
              {library.name}
            </span>
          </div>
        </div>
      )
    }

    // 有描述的compact：左右结构
    return (
      <div className="inline-flex w-[320px] items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <Image src={logo || library.logo} alt="" className="h-8 w-8" unoptimized />
        <div className="flex-1 overflow-hidden">
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
            {library.name}
          </span>
          <p className="mt-1 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
            {description || library.description}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6 block">
      <div className="flex flex-row-reverse gap-6">
        <div className="flex-auto">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{library.name}</h3>
          {showDescription && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {description || library.description}
            </p>
          )}
          {(href || library.href) &&
            (() => {
              const targetHref = href || library.href
              const validHref = targetHref && isValidRoute(targetHref) ? targetHref : undefined

              return validHref ? (
                <p className="mt-4">
                  <Button href={validHref} variant="text" arrow="right">
                    Read more
                  </Button>
                </p>
              ) : null
            })()}
        </div>
        <Image src={logo || library.logo} alt="" className="h-12 w-12" unoptimized />
      </div>
    </div>
  )
}
