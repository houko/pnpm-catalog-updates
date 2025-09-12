'use client'

import { Link } from '@/i18n/navigation'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'
import { CloseButton } from '@headlessui/react'

interface NavGroup {
  title: string
  links: Array<{
    title: string
    href: string
  }>
}

function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li className="md:hidden">
      <CloseButton
        as={Link}
        href={href}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </CloseButton>
    </li>
  )
}

function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}: {
  href: string
  children: React.ReactNode
  tag?: string
  active?: boolean
  isAnchorLink?: boolean
}) {
  return (
    <CloseButton
      as={Link}
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </CloseButton>
  )
}

function VisibleSectionHighlight({ group, pathname }: { group: NavGroup; pathname: string }) {
  let [sections, visibleSections] = useInitialValue(
    [useSectionStore((s) => s.sections), useSectionStore((s) => s.visibleSections)],
    useIsInsideMobileNavigation()
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex((section) => section.id === visibleSections[0])
  )
  let itemHeight = remToPx(2)
  let height = isPresent ? Math.max(1, visibleSections.length) * itemHeight : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="bg-zinc-800/2.5 dark:bg-white/2.5 absolute inset-x-0 top-0 will-change-transform"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({ group, pathname }: { group: NavGroup; pathname: string }) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({ group, className }: { group: NavGroup; className?: string }) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation
  )

  let isActiveGroup = group.links.findIndex((link) => link.href === pathname) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2 layout="position" className="text-xs font-semibold text-zinc-900 dark:text-white">
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && <VisibleSectionHighlight group={group} pathname={pathname} />}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && <ActivePageMarker group={group} pathname={pathname} />}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === pathname}>
                {link.title}
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {link.href === pathname && sections.length > 0 && (
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink href={`${link.href}#${section.id}`} tag={section.tag} isAnchorLink>
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

// Hook to get translated navigation
export function useNavigation(): Array<NavGroup> {
  const t = useTranslations('Navigation')
  const tCommon = useTranslations('Common')

  // Define which pages go in which sections
  const guidePages = ['quickstart', 'sdks', 'authentication', 'pagination', 'errors', 'webhooks']
  const writingPages = [
    'writing-basics',
    'writing-components',
    'writing-code',
    'writing-layout',
    'writing-api',
    'writing-advanced',
  ]
  const resourcePages = ['contacts', 'conversations', 'messages', 'groups', 'attachments']

  const createNavLink = (page: string) => ({
    title: t(page),
    href: `/${page}`,
  })

  const isProduction = process.env.NODE_ENV === 'production'

  const navGroups = [
    {
      title: tCommon('guides'),
      links: [{ title: tCommon('introduction'), href: '/' }, ...guidePages.map(createNavLink)],
    },
    {
      title: tCommon('resources'),
      links: resourcePages.map(createNavLink),
    },
  ]

  // Only show Writing Docs in development
  if (!isProduction) {
    navGroups.splice(1, 0, {
      title: tCommon('writing'),
      links: writingPages.map(createNavLink),
    })
  }

  return navGroups
}

// For backward compatibility - static navigation without translation
const createStaticNavigation = (): Array<NavGroup> => {
  const isProduction = process.env.NODE_ENV === 'production'

  const staticNavGroups = [
    {
      title: 'Guides',
      links: [
        { title: 'Introduction', href: '/' },
        { title: 'Quickstart', href: '/quickstart' },
        { title: 'SDKs', href: '/sdks' },
        { title: 'Authentication', href: '/authentication' },
        { title: 'Pagination', href: '/pagination' },
        { title: 'Errors', href: '/errors' },
        { title: 'Webhooks', href: '/webhooks' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { title: 'Contacts', href: '/contacts' },
        { title: 'Conversations', href: '/conversations' },
        { title: 'Messages', href: '/messages' },
        { title: 'Groups', href: '/groups' },
        { title: 'Attachments', href: '/attachments' },
      ],
    },
  ]

  // Only show Writing Docs in development
  if (!isProduction) {
    staticNavGroups.splice(1, 0, {
      title: 'Writing Docs',
      links: [
        { title: 'Writing Basics', href: '/writing-basics' },
        { title: 'Writing Components', href: '/writing-components' },
        { title: 'Writing Code', href: '/writing-code' },
        { title: 'Writing Layout', href: '/writing-layout' },
        { title: 'Writing API', href: '/writing-api' },
        { title: 'Writing Advanced', href: '/writing-advanced' },
      ],
    })
  }

  return staticNavGroups
}

export const navigation: Array<NavGroup> = createStaticNavigation()

export function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  const tCommon = useTranslations('Common')
  const navigation = useNavigation()

  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href="/">{tCommon('api')}</TopLevelNavItem>
        <TopLevelNavItem href="#">{tCommon('documentation')}</TopLevelNavItem>
        <TopLevelNavItem href="#">{tCommon('support')}</TopLevelNavItem>
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
      </ul>
    </nav>
  )
}
