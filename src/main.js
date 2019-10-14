import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import VueGtm from 'vue-gtm'

import App from './app.vue'
import router from './router'
import store from './store'
import './service-worker'

sync(store, router)

const isDev = process.env.NODE_ENV !== 'production'
Vue.use(VueGtm, {
  id: 'GTM-5G6FXJ7',
  debug: isDev,
  vueRouter: router
})

Vue.config.productionTip = false

const $app = window.$app = new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
      this.$router.push(redirect)
    }
  }
})

$app.$mount('#app')
