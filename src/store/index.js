import Vue from 'vue'
import Vuex from 'vuex'

import heroes from './modules/heroes'
import forms from './modules/forms'
import todos from './modules/todos'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    baseUrl: 'http://base_52.local'
  },
  modules: {
    forms,
    todos,
    heroes
  },

  strict: process.env.NODE_ENV !== 'production'
})

export default store
