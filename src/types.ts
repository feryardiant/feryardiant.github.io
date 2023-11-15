import type { ViteSSGContext } from 'vite-ssg'

export type SiteLocale = 'id' | 'en'

export type UserModule = (ctx: ViteSSGContext) => void

export interface SiteModule {
  install: UserModule
}
