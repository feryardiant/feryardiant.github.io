import 'vue-router'
import type { ViteSSGContext } from 'vite-ssg'
import type { Frontmatter } from 'vite-plugin-md'

export type UserModule = (ctx: ViteSSGContext) => void
export interface SiteModule {
  install: UserModule
}

export interface UserFrontmatter extends Frontmatter {
  container?: 'wide' | 'narrow'
  layout?: string
  locale?: 'id' | 'en'
  showCTA?: boolean
}
