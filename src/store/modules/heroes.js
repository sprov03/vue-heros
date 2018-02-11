import baseActions from '../base-actions'
import baseGetters from '../base-getters'
import baseMutations from '../base-mutations'

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
