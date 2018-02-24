import Vue from 'vue'
import Vuex from 'vuex'
import Cleave from 'vue-cleave-component'

import heroes from './modules/heroes'
import forms from './modules/forms'
import todos from './modules/todos'
import sync from './modules/sync'
import globalComponents from '../components/utilities/global'

Vue.use(Vuex)
Vue.use(Cleave)
Vue.mixin(globalComponents)

const store = new Vuex.Store({
  state: {
    baseUrl: 'http://base_52.local'
  },
  mixins: [
  ],
  modules: {
    forms,
    todos,
    heroes,
    sync
  },

  strict: process.env.NODE_ENV !== 'production'
})

export default store
