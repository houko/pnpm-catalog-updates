// Global type declarations for docs app

// SVG file declarations
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
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
