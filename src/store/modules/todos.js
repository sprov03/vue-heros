import store from '../defaults/base/store'

const todos = {
  namespaced: true,
  state: Object.assign(store.state, {
    url: 'api/todos',
    localStoragePath: 'todos.collection'
  }),
  mutations: Object.assign(store.mutations, {}),

  getters: Object.assign(store.getters, {}),

  actions: Object.assign(store.actions, {}),

  strict: process.env.NODE_ENV !== 'production'
}

export default todos
