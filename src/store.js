import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      scanInterval: 1
    }
  },
  mutations: {
    setSettings(state, value) {
      state.settings = value
    }
  },
  actions: {},
  plugins: [createPersistedState()]
})
