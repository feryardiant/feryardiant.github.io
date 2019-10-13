import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import App from './app.vue'
import router from './router'
import store from './store'
// import './worker'

sync(store, router)

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
