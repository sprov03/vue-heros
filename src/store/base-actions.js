import axios from 'axios'
import _ from 'lodash'
import mainStore from './index'

const defaultActions = {
  getCollection: function ({state, commit}) {
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
  getInstance: function ({state, commit, dispatch}, id) {
    let instance

    instance = state.collection.find((instance) => {
      return instance.id === parseInt(id)
    })

    if (instance) {
      return Promise.resolve({data: _.clone(instance)})
    }

    return axios.get(`${mainStore.state.baseUrl}/${state.url}/${id}`)
      .then((response) => {
        return response
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

        return response
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
    return axios.put(`${mainStore.state.baseUrl}/${state.url}/${updatedInstance.id}`, updatedInstance)
      .then((response) => {
        let instance = response.data

        if (!index) {
          index = state.collection.findIndex((instance) => instance.id === response.data.id)
        }

        commit('updateCollection', {instance, index})

        return response
      })
      .catch((response) => {
        console.log('Error Response: ', response)

        throw response
      })
  }
}

export default defaultActions
