// Global type declarations for docs app

// SVG file declarations
declare module '*.svg' {
  const content: any
  export default content
}

// Specific SVG logo declarations
declare module '@/images/logos/go.svg' {
  const content: any
  export default content
}

declare module '@/images/logos/node.svg' {
  const content: any
  export default content
}

declare module '@/images/logos/php.svg' {
  const content: any
  export default content
}

declare module '@/images/logos/python.svg' {
  const content: any
  export default content
}

declare module '@/images/logos/ruby.svg' {
  const content: any
  export default content
}

// Module path declarations
declare module '@/lib/remToPx' {
  export function remToPx(remValue: number): number
}

declare module '@/mdx/search.mjs' {
  export interface Result {
    url: string
    title: string
    pageTitle?: string
    [key: string]: string | undefined
  }
  export function search(query: string, options?: Record<string, unknown>): Result[]
}
