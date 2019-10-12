import Home from '@/views/home.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "pages" */ '@/views/about.vue')
  },

  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "pages" */ '@/views/contact.vue')
  },

  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import(/* webpackChunkName: "pages" */ '@/views/portfolio.vue')
  },

  {
    path: '*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "errors" */ '@/views/not-found.vue'),
    meta: {
      title: 'Page not found',
      menu: false
    }
  }
]
