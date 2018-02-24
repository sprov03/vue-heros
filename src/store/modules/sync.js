import axios from 'axios'
import mainStore from '../index'

const sync = {
  namespaced: true,
  state: {
    url: 'api/sync',
    localStoragePath: 'todos.collection'
  },
  mutations: {},

  getters: {},

  actions: {
    checkSync () {
      return axios.get(`${mainStore.state.baseUrl}/api/sync`)
        .then((response) => {
          if (response.status === 205) {
            console.log('Needs to be resynced')

            return
          }
          console.log('response', response)

          return response
        })
    }
  },

  strict: process.env.NODE_ENV !== 'production'
}

export default sync
