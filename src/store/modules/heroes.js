import baseActions from '../defaults/base/base-actions'
import baseGetters from '../defaults/base/base-getters'
import baseMutations from '../defaults/base/base-mutations'

const heroes = {
  namespaced: true,
  state: {
    collection: [],
    defaultInstance: {},
    collectionLoaded: false,
    url: 'api/heroes'
  },
  mutations: Object.assign(baseMutations, {}),

  getters: Object.assign(baseGetters, {}),

  actions: Object.assign(baseActions, {}),

  strict: process.env.NODE_ENV !== 'production'
}

export default heroes
