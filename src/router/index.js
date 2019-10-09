import Qs from 'qs'
import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'

Vue.use(Router)

const qsConfig = {
  indices: true,
  allowDots: true
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  parseQuery: query => Qs.parse(query, qsConfig),
  stringifyQuery (query) {
    const result = Qs.stringify(query, qsConfig)
    return result ? `?${result}` : ''
  },
  routes
})
