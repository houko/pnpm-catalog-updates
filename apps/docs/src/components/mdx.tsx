import { Link } from '@/i18n/navigation'
import clsx from 'clsx'

import { Feedback } from '@/components/Feedback'
import { Heading } from '@/components/Heading'
import { Prose } from '@/components/Prose'
import { isValidRoute } from '@/utils/routing'

export const a = Link
export { Button } from '@/components/Button'
export { Code as code, CodeGroup, Pre as pre } from '@/components/Code'
export { Guides } from '@/components/Guides'
export { Libraries } from '@/components/Libraries'
export { Library } from '@/components/Library'
export { Resources } from '@/components/Resources'
export { Tag } from '@/components/Tag'

// Common icons
export { BellIcon } from '@/components/icons/BellIcon'
export { BookIcon } from '@/components/icons/BookIcon'
export { ChatBubbleIcon } from '@/components/icons/ChatBubbleIcon'
export { CheckIcon } from '@/components/icons/CheckIcon'
export { CogIcon } from '@/components/icons/CogIcon'
export { EnvelopeIcon } from '@/components/icons/EnvelopeIcon'
export { UserIcon } from '@/components/icons/UserIcon'
export { UsersIcon } from '@/components/icons/UsersIcon'

export function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <article className="flex h-full flex-col pb-10 pt-16">
      <Prose className="flex-auto">{children}</Prose>
      <footer className="mx-auto mt-16 w-full max-w-2xl lg:max-w-5xl">
        <Feedback />
      </footer>
    </article>
  )
}

// Resource component for use in MDX
export function Resource({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  const validHref = isValidRoute(href) ? href : undefined

  return (
    <div className="relative flex flex-col rounded-2xl border border-zinc-200 p-6 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
        {validHref ? (
          <Link href={validHref}>
            <span className="absolute inset-0 rounded-2xl" />
            {title}
          </Link>
        ) : (
          <span>
            <span className="absolute inset-0 cursor-not-allowed rounded-2xl" />
            {title}
          </span>
        )}
      </h3>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  )
}

export const h2 = function H2(
  props: Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'level'>
) {
  return <Heading level={2} {...props} />
}

function InfoIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 text-sm/6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:var(--color-emerald-300)] dark:[--tw-prose-links:var(--color-white)]">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</div>
    </div>
  )
}

export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  )
}

export function Col({ children, sticky = false }: { children: React.ReactNode; sticky?: boolean }) {
  return (
    <div
      className={clsx(
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        sticky && 'xl:sticky xl:top-24'
      )}
    >
      {children}
    </div>
  )
}

export function Properties({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="m-0 max-w-[calc(var(--container-lg)-(--spacing(8)))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  )
}

export function Property({
  name,
  children,
  type,
}: {
  name: string
  children: React.ReactNode
  type?: string
}) {
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        {type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">{type}</dd>
          </>
        )}
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</dd>
      </dl>
    </li>
  )
}
