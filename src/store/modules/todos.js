import store from '../defaults/pagination/store'
import axios from 'axios'
import mainStore from '../index'
let clone = require('lodash/cloneDeep')

const todos = {
  namespaced: true,
  state: Object.assign(clone(store.state), {
    url: 'api/todos'
  }),
  mutations: Object.assign(store.mutations, {}),

  getters: Object.assign(store.getters, {}),

  actions: Object.assign(store.actions, {
    getHeroTodos: function ({state, commit, dispatch}) {
      if (state.collectionLoaded) {
        let response = {
          data: {
            data: state.collection
          }
        }

        return Promise.resolve(response)
      }

      return axios.get(`${mainStore.state.baseUrl}/${state.url}`)
        .then((response) => {
          commit(`setPagination`, response.data)
          commit(`setCollection`, response.data.data)

          return response
        })
        .catch((response) => {
          console.log('Error Response: ', response)

          throw response
        })
    }
  }),

  strict: process.env.NODE_ENV !== 'production'
}

export default todos
