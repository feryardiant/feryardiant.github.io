import { ViteSSG } from 'vite-ssg'
// import { createApp } from 'vue'
import vueGtm from 'vue-gtm'
import nProgress from 'nprogress'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import 'windi.css'
import autoRoutes from 'pages-generated'
import { setupLayouts } from 'layouts-generated'

import './main.css'
import App from './app.vue'

const routes = autoRoutes.map(route => {
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
}, ({ app, router, routes, isClient }) => {
  dayjs.extend(localizedFormat)

  router.linkActiveClass = ''
  router.linkExactActiveClass = 'is-active'

  if (isClient) {
    app.use(vueGtm, {
      id: import.meta.env.VITE_GTM_KEY,
      routes
    })

    router.beforeEach(() => { nProgress.start() })
    router.afterEach(() => { nProgress.done() })
  }
})
