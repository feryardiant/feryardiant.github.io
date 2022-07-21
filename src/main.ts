import { ViteSSG } from 'vite-ssg'

import autoRoutes from 'pages-generated'
import { setupLayouts } from 'layouts-generated'

import 'virtual:windi-devtools'
import 'virtual:windi.css'

import App from './app.vue'
import './style.css'
import type { SiteModule } from './types'

const routes = autoRoutes.map((route) => {
  return {
    ...route,
    alias: route.path.endsWith('/')
      ? `${route.path}index.html`
      : `${route.path}.html`,
  }
})

export const createApp = ViteSSG(App, {
  base: import.meta.env.BASE_URL,
  routes: setupLayouts(routes),
  scrollBehavior(from, to, position) {
    return position || { top: 0 }
  },
}, (ctx) => {
  Object.values(
    import.meta.globEager<SiteModule>('./modules/*.ts'),
  ).map(i => i.install(ctx))
})
