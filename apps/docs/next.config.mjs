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
    // Use process.cwd() for CI environments, fallback to __dirname for local
    const projectRoot = process.env.CI 
      ? path.join(process.cwd(), 'apps/docs') 
      : __dirname
    const srcPath = path.resolve(projectRoot, 'src')
    
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': srcPath,
    }
    
    // Always output in production for debugging CI issues
    if (process.env.NODE_ENV === 'production') {
      console.log('CI environment:', !!process.env.CI)
      console.log('Process CWD:', process.cwd())
      console.log('Project root:', projectRoot)
      console.log('Webpack alias @ ->', srcPath)
      console.log('File exists check:', {
        remToPx: fs.existsSync(path.join(srcPath, 'lib/remToPx.ts'))
      })
    }
    
    return config
  },
}

export default withSearch(withMDX(nextConfig))
