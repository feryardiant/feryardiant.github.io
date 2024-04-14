import 'vue-router'

import type { SiteLocale } from '~/types'

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
    title: Frontmatter['title']
    description: Frontmatter['description']
    frontmatter: Frontmatter
    locale: SiteLocale
  }
}
