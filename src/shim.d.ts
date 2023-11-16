import 'vue-router'
import 'vite-plugin-md'

import { SiteLocale } from '~/types'

export {}

declare module 'vite-plugin-md' {
  interface Frontmatter {
    container?: 'wide' | 'narrow'
    locale?: SiteLocale
    comments?: boolean
    thumb?: string
    date?: string
    updated?: string
  }
}

/**
 * @see https://router.vuejs.org/guide/advanced/meta.html#TypeScript
 */
declare module 'vue-router' {
  import type { Frontmatter } from 'vite-plugin-md'

  interface RouteMeta {
    layout?: Frontmatter['layout']
    title: Frontmatter['title']
    description: Frontmatter['description']
    frontmatter: Frontmatter
    locale: SiteLocale,
  }
}
