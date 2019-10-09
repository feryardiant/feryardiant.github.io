import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,

  state: {
    $busy: false
  },

  mutations: {
    busy (state) {
      state.$busy = true
    },

    done (state) {
      state.$busy = false
    }
  },

  actions: {
    busy ({ commit }) {
      commit('busy')
    },

    done ({ commit }) {
      commit('done')
    }
  }
})
