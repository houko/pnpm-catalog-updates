import nextMDX from '@next/mdx'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import createNextIntlPlugin from 'next-intl/plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

const isProduction = process.env.NODE_ENV === 'production'
const useCustomDomain = process.env.USE_CUSTOM_DOMAIN === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages compatible static export
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // GitHub Pages deployment paths (empty when using custom domain)
  basePath: isProduction && !useCustomDomain ? '/pnpm-catalog-updates' : '',
  assetPrefix: isProduction && !useCustomDomain ? '/pnpm-catalog-updates/' : '',
  
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/**/*': ['./src/app/**/*.mdx'],
  },
}

export default withNextIntl(withSearch(withMDX(nextConfig)))
