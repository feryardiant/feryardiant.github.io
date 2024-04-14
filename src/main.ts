import { ViteSSG } from 'vite-ssg'

import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

import 'virtual:windi-devtools'
import 'virtual:windi.css'

import App from './app.vue'
import './style.css'
import type { SiteModule } from './types'

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
