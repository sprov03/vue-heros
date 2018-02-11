import Vue from 'vue'

const baseMutations = {
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
  }
}

export default baseMutations
