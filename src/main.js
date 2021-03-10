import { ViteSSG } from 'vite-ssg'
// import { createApp } from 'vue'
// import VueGtm from 'vue-gtm'
// import nProgress from 'nprogress'
// import dayjs from 'dayjs'
// import LocalizedFormat from 'dayjs/plugin/localizedFormat'

import 'windi.css'
import autoRoutes from 'pages-generated'
import { setupLayouts } from 'layouts-generated'

import './main.css'
import App from '/~/app.vue'

const routes = autoRoutes.map(route => {
  const frontmatter = Object.assign({}, {
    layout: 'default',
    comments: true,
    thumb: 'default-thumbnail.png',
    tags: [],
    lang: 'id'
  }, route.meta.frontmatter)

  frontmatter.thumb = `/src/assets/uploads/${frontmatter.thumb}`
  route.meta.frontmatter = frontmatter
  // console.log(route)

  return {
    ...route,
    alias: route.path.endsWith('/')
      ? `${route.path}index.html`
      : `${route.path}.html`,
  }
})

export const createApp = ViteSSG(App, {
  routes: setupLayouts(routes)
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
