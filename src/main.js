import { ViteSSG } from 'vite-ssg'
// import { createApp } from 'vue'
// import VueGtm from 'vue-gtm'
import nProgress from 'nprogress'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import 'windi.css'
import autoRoutes from 'pages-generated'
import { setupLayouts } from 'layouts-generated'

import './main.css'
import App from './app.vue'

const routes = autoRoutes.map(route => {
  let { frontmatter } = route.meta

  frontmatter = Object.assign({}, {
    comments: true,
    layout: 'default',
    locale: 'id',
    thumb: 'default-thumbnail.png',
  }, frontmatter)

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
}, ({ router, isClient }) => {
  dayjs.extend(localizedFormat)

  router.linkActiveClass = ''
  router.linkExactActiveClass = 'is-active'

  if (isClient) {
    router.beforeEach(() => { nProgress.start() })
    router.afterEach(() => { nProgress.done() })
  }
})
// const $app = createApp(App, {
//   routes,
//   created () {
//     if (sessionStorage.redirect) {
//       const redirect = sessionStorage.redirect
//       delete sessionStorage.redirect
//       this.$router.push(redirect)
//     }
//   }
// })

// $app.use(VueGtm, {
//   id: 'GTM-5G6FXJ7',
//   routes
// })

// $app.mount('#app')
