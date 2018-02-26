import store from '../defaults/pagination/store'
let clone = require('lodash/cloneDeep')

const forms = {
  namespaced: true,
  state: Object.assign(clone(store.state), {
    url: 'api/forms'
  }),
  mutations: Object.assign(store.mutations, {}),

  getters: Object.assign(store.getters, {}),

  actions: Object.assign(store.actions, {}),

  strict: process.env.NODE_ENV !== 'production'
}

export default forms
