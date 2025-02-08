import type { SiteModule } from './types'

import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'

import { routes } from 'vue-router/auto-routes'
import App from './app.vue'

import 'virtual:windi-devtools'
import 'virtual:windi.css'
import './style.css'

export const createApp = ViteSSG(App, {
  base: import.meta.env.BASE_URL,
  routes: setupLayouts(routes),
  scrollBehavior(from, to, position) {
    return position || { top: 0 }
  },
}, (ctx) => {
  Object.values(
    import.meta.glob<SiteModule>('./modules/*.ts', { eager: true }),
  ).forEach(i => i.install?.(ctx))
})
