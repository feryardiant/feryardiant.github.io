// import { ViteSSG } from 'vite-ssg'
import { createApp } from 'vue'
import VueGtm from 'vue-gtm'
import nProgress from 'nprogress'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

import 'windi.css'
import autoRoutes from 'pages-generated'

import App from '/~/app.vue'

const routes = autoRoutes.map(route => {
  return {
    ...route,
    alias: route.path.endsWith('/')
      ? `${route.path}index.html`
      : `${route.path}.html`,
  }
})

const $app = createApp(App, {
  routes,
  created () {
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
      this.$router.push(redirect)
    }
  }
})

$app.use(VueGtm, {
  id: 'GTM-5G6FXJ7',
  routes
})

$app.mount('#app')
