import store from '../defaults/pagination/store'
let clone = require('lodash/cloneDeep')

const heroes = {
  namespaced: true,
  state: Object.assign(clone(store.state), {
    url: 'api/heroes'
  }),
  mutations: Object.assign(store.mutations, {}),

  getters: Object.assign(store.getters, {}),

  actions: Object.assign(store.actions, {
    getTodos: async function ({state, commit, dispatch, getters}, id) {
      let instance = getters.instance(id)

      if (instance && instance.todos) {
        return Promise.resolve({data: clone(instance.todos)})
      }

      let todos = await dispatch('todos/getHeroTodos', null, {root: true})

      if (!instance || !instance.todos) {
        instance = await dispatch('resolvePending', id)

        if (instance && !instance.todos) {
          instance.todos = todos.data.data
          commit('updateCollection', instance)
        }
      }

      return clone(todos)
    }
  }),

  strict: process.env.NODE_ENV !== 'production'
}

export default heroes
