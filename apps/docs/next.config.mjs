import nextMDX from '@next/mdx'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages compatible static export
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // GitHub Pages deployment paths
  basePath: isProduction ? '/pnpm-catalog-updates' : '',
  assetPrefix: isProduction ? '/pnpm-catalog-updates/' : '',
  
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/**/*': ['./src/app/**/*.mdx'],
  },
  webpack: (config) => {
    // Use __dirname which is always relative to this config file
    const srcPath = path.resolve(__dirname, 'src')
    
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': srcPath,
    }
    
    // Debug output
    if (process.env.NODE_ENV !== 'production') {
      console.log('Webpack alias @ ->', srcPath)
      console.log('__dirname ->', __dirname)
    }
    
    return config
  },
}

export default withSearch(withMDX(nextConfig))
