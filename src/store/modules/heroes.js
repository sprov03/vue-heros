import axios from 'axios'
import Vue from 'vue'

const heroes = {
  state: {
    paginatedHeroes: {
      data: []
    }
  },
  mutations: {
    setState (state, data) {
      state.paginatedHeroes = data
    },
    setHeroes (state, heroes) {
      state.paginatedHeroes.data = heroes
    },
    setHero (state, {updatedHero, index}) {
      Vue.set(state.paginatedHeroes.data, index, updatedHero)
    }
  },

  getters: {
    heroes (state) {
      return state.paginatedHeroes.data
    }
  },

  actions: {
    getHeroes: function ({state, commit}) {
      return axios.get(`http://base_52.local/api/heroes`)
        .then((response) => {
          commit('setState', response.data)

          return response
        })
        .catch((response) => {
          console.log('Error Response: ', response)

          return response
        })
    },
    updateHero: function ({state, commit}, {updatedHero, index}) {
      return axios.put(`http://base_52.local/api/heroes/${updatedHero.id}`, updatedHero)
        .then((response) => {
          updatedHero = response.data
          commit('setHero', {updatedHero, index})

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

export default heroes
