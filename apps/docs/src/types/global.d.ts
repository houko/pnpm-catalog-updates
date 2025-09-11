// Global type declarations for docs app

// SVG file declarations for static imports (Next.js Image component)
declare module '*.svg' {
  const content: string
  export default content
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
