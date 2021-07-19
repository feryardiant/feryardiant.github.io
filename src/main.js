import { ViteSSG } from 'vite-ssg'

import autoRoutes from 'pages-generated'
import { setupLayouts } from 'layouts-generated'

import App from './app.vue'

import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './main.css'

const routes = autoRoutes.map((route) => {
  return {
    ...route,
    alias: route.path.endsWith('/')
      ? `${route.path}index.html`
      : `${route.path}.html`,
  }
})

export const createApp = ViteSSG(App, {
  routes: setupLayouts(routes),
  scrollBehavior (from, to, position) {
    return position || { top: 0 }
  }
}, (ctx) => {
  Object.values(
    import.meta.globEager('./modules/*.js')
  ).map(i => i.install?.(ctx))
})
