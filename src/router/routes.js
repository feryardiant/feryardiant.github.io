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
    component: () => import(/* webpackChunkName: "about" */ '@/views/about.vue')
  },

  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '@/views/contact.vue')
  },

  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import(/* webpackChunkName: "portfolio" */ '@/views/portfolio.vue')
  },

  {
    path: '*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "error-404" */ '@/views/not-found.vue'),
    meta: {
      title: 'Page not found',
      menu: false
    }
  }
]
