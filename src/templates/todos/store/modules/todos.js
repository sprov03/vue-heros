import axios from 'axios'
import Vue from 'vue'

/**
 * Replacements
 * Resources
 * Resource
 * resources
 * resource
 */

const resources = {
  state: {
    paginatedResources: {
      data: []
    }
  },
  mutations: {
    setState (state, data) {
      state.paginatedResources = data
    },
    setResources (state, resources) {
      state.paginatedResources.data = resources
    },
    setResource (state, {updatedResource, index}) {
      Vue.set(state.paginatedResources.data, index, updatedResource)
    }
  },

  getters: {
    resources (state) {
      return state.paginatedResources.data
    }
  },

  actions: {
    getResources: function ({state, commit}) {
      return axios.get(`http://base_52.local/api/resources`)
        .then((response) => {
          commit('setState', response.data)

          return response
        })
        .catch((response) => {
          console.log('Error Response: ', response)

          return response
        })
    },
    updateResource: function ({state, commit}, {updatedResource, index}) {
      return axios.put(`http://base_52.local/api/resources/${updatedResource.id}`, updatedResource)
        .then((response) => {
          updatedResource = response.data
          commit('setResource', {updatedResource, index})

          return response
        })
        .catch((response) => {
          console.log('Error Response: ', response)

          return response
        })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
}

export default resources
