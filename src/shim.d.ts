import type { SiteLocale } from '~/types'

import 'vue-router'

export {}

declare module 'unplugin-vue-markdown/types' {
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
  import type { Frontmatter } from 'unplugin-vue-markdown/types'

  interface RouteMeta {
    layout?: Frontmatter['layout']
    excerpt?: string
    title: Frontmatter['title']
    description: Frontmatter['description']
    frontmatter: Frontmatter
    locale: SiteLocale
    published: number
  }
}
