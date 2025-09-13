import { routing } from '@/i18n/routing'

export function isValidRoute(href: string): href is keyof typeof routing.pathnames {
  return href in routing.pathnames
}
