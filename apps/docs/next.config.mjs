import nextMDX from '@next/mdx'
import path from 'path'
import fs from 'fs'
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
    // More robust path resolution for both local and CI environments
    let projectRoot = __dirname
    
    // Check if we're running from the workspace root (turbo scenario)
    if (process.cwd().endsWith('pnpm-catalog-updates') && 
        !process.cwd().endsWith('apps/docs')) {
      projectRoot = path.join(process.cwd(), 'apps/docs')
    }
    
    const srcPath = path.resolve(projectRoot, 'src')
    
    // Debug logging for CI
    if (process.env.CI) {
      console.log('Next.js webpack config debug:')
      console.log('process.cwd():', process.cwd())
      console.log('__dirname:', __dirname)
      console.log('projectRoot:', projectRoot)
      console.log('srcPath:', srcPath)
    }
    
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': srcPath,
      '@/lib': path.resolve(srcPath, 'lib'),
      '@/images': path.resolve(srcPath, 'images'),
      '@/components': path.resolve(srcPath, 'components'),
      '@/mdx': path.resolve(srcPath, 'mdx'),
    }
    
    // Debug alias paths in CI
    if (process.env.CI) {
      console.log('Webpack aliases:')
      Object.entries(config.resolve.alias).forEach(([key, value]) => {
        if (key.startsWith('@')) {
          console.log(`${key}: ${value}`)
        }
      })
    }
    
    return config
  },
}

export default withSearch(withMDX(nextConfig))
