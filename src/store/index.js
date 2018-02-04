import Vue from 'vue'
import Vuex from 'vuex'

import heroes from './modules/heroes'
import forms from './modules/forms'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  modules: {
    heroes,
    forms
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
