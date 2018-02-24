import axios from 'axios'
import _ from 'lodash'
import mainStore from '../../index'
import Vue from 'vue'
let clone = require('lodash/cloneDeep')

const store = {
  state: {
    url: 'overwrite-me example: /api/todos',
    collection: [],
    defaultInstance: {},
    collectionLoaded: false,
    pending: []
  },
  actions: {
    getCollection: function ({state, commit, dispatch}) {
      if (state.collectionLoaded) {
        return Promise.resolve({data: state.collection})
      }

      return axios.get(`${mainStore.state.baseUrl}/${state.url}`)
        .then((response) => {
          commit(`setCollection`, response.data.data)

          return response
        })
        .catch((response) => {
          console.log('Error Response: ', response)

          throw response
        })
    },
    resolvePending: async function ({state, dispatch}, id) {
      let wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

      if (state.pending.includes(parseInt(id))) {
        console.log('includes', id)
        return wait(100)
          .then(() => dispatch('resolvePending', id))
      }

      return state.collection.find((instance) => {
        return instance.id === parseInt(id)
      })
    },
    getInstance: async function ({state, commit, dispatch}, id) {
      let instance = await dispatch('resolvePending', id)

      if (instance) {
        return Promise.resolve({data: _.clone(instance)})
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
    updateInstance: function ({state, commit}, {updatedInstance, index}) {
      commit('pushPending', updatedInstance.id)
      return axios.put(`${mainStore.state.baseUrl}/${state.url}/${updatedInstance.id}`, updatedInstance)
        .then((response) => {
          let instance = response.data

          if (!index) {
            index = state.collection.findIndex((instance) => instance.id === response.data.id)
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
    defaultInstance (state) {
      return state.defaultInstance
    }
  }
}

export default store
