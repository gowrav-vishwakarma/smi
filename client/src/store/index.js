import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { data: null },
  mutations: {
    getData(state, newData) {
      state.data = newData;
    },
  },
  actions: {},
  modules: {},
})
