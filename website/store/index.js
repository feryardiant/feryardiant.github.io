export const state = () => ({
  $authUser: null
})

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.$authUser.id !== null
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      return false
    }
  }
}

export const mutations = {
  RESET_STORE: (state) => {
    state.$authUser = null
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.$authUser = {
      uid: authUser.uid,
      email: authUser.email
    }
  }
}

export const actions = {
  onAuthStateChanged: ({ commit }, { authUser }) => {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    commit('SET_AUTH_USER', { authUser })
  }
}
