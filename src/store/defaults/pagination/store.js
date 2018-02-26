import axios from 'axios'
import mainStore from '../../index'
import Vue from 'vue'
let clone = require('lodash/cloneDeep')

let store = {
  state: {
    url: 'overwrite-me example: /api/todos',
    query: {},
    pagination: {},
    collection: [],
    defaultInstance: {},
    collectionLoaded: false,
    pending: []
  },
  actions: {
    getCollection: function ({state, commit, dispatch}) {
      if (state.collectionLoaded) {
        let response = {
          data: {
            data: state.collection
          }
        }

        return Promise.resolve(clone(response))
      }

      return axios.get(`${mainStore.state.baseUrl}/${state.url}`)
        .then((response) => {
          commit(`setPagination`, response.data)
          commit(`setCollection`, response.data.data)

          return clone(response)
        })
        .catch((response) => {
          console.log('Error Response: ', response)

          throw response
        })
    },
    resolvePending: async function ({state, dispatch, getters}, id) {
      let wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

      if (state.pending.includes(parseInt(id))) {
        return wait(100)
          .then(() => dispatch('resolvePending', id))
      }

      return getters.instance(id)
    },
    getInstance: async function ({state, commit, dispatch}, id) {
      let instance = await dispatch('resolvePending', id)

      if (instance) {
        return Promise.resolve({data: clone(instance)})
      }

      return axios.get(`${mainStore.state.baseUrl}/${state.url}/${id}`)
        .then((response) => {
          commit('pushCollection', response.data)

          return clone(response)
        })
        .catch((response) => {
          console.log('Error Response: ', response)

          throw response
        })
    },
    deleteInstance: function ({state, commit}, {id}) {
      return axios.delete(`${mainStore.state.baseUrl}/${state.url}/${id}`)
        .then((response) => {
          const index = state.collection.findIndex((instance) => instance.id === response.data.id)
          commit('removeCollection', index)

          return response
        })
        .catch((response) => {
          console.log('Error Response: ', response)

          throw response
        })
    },
    createInstance: function ({state, commit}, instance) {
      return axios.post(`${mainStore.state.baseUrl}/${state.url}`, instance)
        .then((response) => {
          if (state.collectionLoaded) {
            commit('pushCollection', response.data)
          }

          return clone(response)
        })
        .catch((response) => {
          console.log('Error Response: ', response)

          throw response
        })
    },
    saveInstance: function ({state, dispatch}, instance) {
      if (instance.id) {
        return dispatch('updateInstance', {updatedInstance: instance})
      } else {
        return dispatch('createInstance', instance)
      }
    },
    updateInstance: function ({state, commit, getters}, {updatedInstance, index}) {
      commit('pushPending', updatedInstance.id)
      return axios.put(`${mainStore.state.baseUrl}/${state.url}/${updatedInstance.id}`, updatedInstance)
        .then((response) => {
          let instance = response.data

          if (!index) {
            index = getters.index(response.data.id)
          }

          commit('updateCollection', {instance, index})
          commit('removePending', updatedInstance.id)

          return clone(response)
        })
        .catch((response) => {
          console.log('Error Response: ', response)
          commit('removePending', updatedInstance.id)

          throw response
        })
    }
  },
  mutations: {
    setCollection (state, collection) {
      state.collection = collection
      state.collectionLoaded = true
    },
    setPagination (state, pagination) {
      state.pagination = pagination
    },
    pushCollection (state, instance) {
      let index = state.collection.length

      if (Number.isInteger(index) && index > -1) {
        Vue.set(state.collection, index, instance)
      }
    },
    removeCollection (state, index) {
      if (Number.isInteger(index) && index > -1) {
        Vue.delete(state.collection, index)
      }
    },
    updateCollection (state, {instance, index}) {
      if (Number.isInteger(index) && index > -1) {
        Vue.set(state.collection, index, instance)
      }
    },
    pushPending (state, id) {
      Vue.set(state.pending, state.pending.length, id)
    },
    removePending (state, id) {
      const index = state.pending.findIndex((pending) => pending === id)

      if (Number.isInteger(index) && index > -1) {
        Vue.delete(state.pending, index)
      }
    }
  },
  getters: {
    collection (state) {
      return state.collection
    },
    collectionLoaded (state) {
      return state.collectionLoaded
    },
    instance: (state) => (id) => {
      return state.collection.find((instance) => instance.id === parseInt(id))
    },
    index: (state) => (id) => {
      return state.collection.findIndex((instance) => instance.id === parseInt(id))
    },
    defaultInstance (state) {
      return state.defaultInstance
    }
  }
}

export default store
