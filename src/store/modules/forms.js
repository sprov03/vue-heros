import axios from 'axios'
import Vue from 'vue'

/**
 * Replacements
 * Forms
 * Form
 * forms
 * form
 */

const forms = {
  state: {
    paginatedForms: {
      data: []
    }
  },
  mutations: {
    setState (state, data) {
      state.paginatedForms = data
    },
    setForms (state, forms) {
      state.paginatedForms.data = forms
    },
    setForm (state, {updatedForm, index}) {
      Vue.set(state.paginatedForms.data, index, updatedForm)
    }
  },

  getters: {
    forms (state) {
      return state.paginatedForms.data
    }
  },

  actions: {
    getForms: function ({state, commit}) {
      return axios.get(`http://base_52.local/api/forms`)
        .then((response) => {
          commit('setState', response.data)

          return response
        })
        .catch((response) => {
          console.log('Error Response: ', response)

          return response
        })
    },
    updateForm: function ({state, commit}, {updatedForm, index}) {
      return axios.put(`http://base_52.local/api/forms/${updatedForm.id}`, updatedForm)
        .then((response) => {
          updatedForm = response.data
          commit('setForm', {updatedForm, index})

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

export default forms
