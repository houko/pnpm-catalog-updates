import * as mdxComponents from '@/components/mdx'
import { rehypePlugins } from '@/mdx/rehype.mjs'
import { remarkPlugins } from '@/mdx/remark.mjs'
import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import path from 'path'

interface PageProps {
  params: {
    locale: string
    slug: string[]
  }
}

// Automatically discover pages from content directory
export async function generateStaticParams() {
  const locales = ['en', 'zh']
  const params = []

  // Scan content directory for available pages
  const contentDir = path.join(process.cwd(), 'src', 'content')

  try {
    // Get all MDX files from English directory (as reference)
    const enDir = path.join(contentDir, 'en')
    if (fs.existsSync(enDir)) {
      const enFiles = fs
        .readdirSync(enDir)
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace('.mdx', ''))

      // Generate params for all locales and discovered pages
      for (const locale of locales) {
        for (const page of enFiles) {
          params.push({
            locale,
            slug: [page],
          })
        }
      }
    }
  } catch (error) {
    console.warn('Could not read content directory:', error)
    // Fallback to empty params - pages will be generated dynamically
  }

  return params
}

// Use the existing MDX components
const components = mdxComponents

export default async function DynamicPage({ params }: PageProps) {
  const { locale, slug } = await params
  const pageName = slug[0] // Get the first slug segment (e.g., 'quickstart')

  // Try to load the MDX file based on locale and slug
  const contentPath = path.join(process.cwd(), 'src', 'content', locale, `${pageName}.mdx`)

  // Check if file exists
  if (!fs.existsSync(contentPath)) {
    // Fallback to English if the localized version doesn't exist
    const fallbackPath = path.join(process.cwd(), 'src', 'content', 'en', `${pageName}.mdx`)
    if (!fs.existsSync(fallbackPath)) {
      notFound()
    }
    // Use English content if localized version doesn't exist
    const fallbackContent = fs.readFileSync(fallbackPath, 'utf-8')
    const { content, data } = matter(fallbackContent)

    return (
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins,
            rehypePlugins,
          },
        }}
      />
    )
  }

  // Read and parse the MDX file
  const source = fs.readFileSync(contentPath, 'utf-8')
  const { content, data } = matter(source)

  return (
    <MDXRemote
      source={content}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins,
          rehypePlugins,
        },
      }}
    />
  )
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const pageName = slug[0]

  const contentPath = path.join(process.cwd(), 'src', 'content', locale, `${pageName}.mdx`)
  let finalPath = contentPath

  // Fallback to English if localized version doesn't exist
  if (!fs.existsSync(contentPath)) {
    finalPath = path.join(process.cwd(), 'src', 'content', 'en', `${pageName}.mdx`)
  }

  if (!fs.existsSync(finalPath)) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    }
  }

  const source = fs.readFileSync(finalPath, 'utf-8')
  const { data } = matter(source)

  return {
    title: data.title || pageName,
    description: data.description || `Documentation for ${pageName}`,
  }
}
