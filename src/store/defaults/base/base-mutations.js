import Vue from 'vue'

const baseMutations = {
  setCollection (state, collection) {
    state.collection = collection
    state.collectionLoaded = true

    // Update Local Storage
    state.setCollectionLocalStorage(collection)
  },
  pushCollection (state, instance) {
    let index = state.collection.length

    if (Number.isInteger(index) && index > -1) {
      Vue.set(state.collection, index, instance)

      // Update Local Storage
      let localStorage = state.getCollectionLocalStorage()
      if (localStorage) {
        localStorage[index] = instance
        state.setCollectionLocalStorage(localStorage)
      }
    }
  },
  removeCollection (state, index) {
    if (Number.isInteger(index) && index > -1) {
      Vue.delete(state.collection, index)

      // Update Local Storage
      let localStorage = state.getCollectionLocalStorage()
      if (localStorage) {
        localStorage.splice(index, 1)
        state.setCollectionLocalStorage(localStorage)
      }
    }
  },
  updateCollection (state, {instance, index}) {
    if (Number.isInteger(index) && index > -1) {
      Vue.set(state.collection, index, instance)

      // Update Local Storage
      let localStorage = state.getCollectionLocalStorage()
      if (localStorage) {
        localStorage[index] = instance
        state.setCollectionLocalStorage(localStorage)
      }
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
}

export default baseMutations
