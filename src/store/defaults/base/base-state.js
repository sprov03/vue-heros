const baseState = {
  url: 'overwrite-me example: /api/todos',
  collection: [],
  defaultInstance: {},
  collectionLoaded: false,
  pending: [],
  getCollectionLocalStorage () {
    if (typeof (Storage) !== 'undefined' && this.localStoragePath) {
      if (parseInt(localStorage.getItem('expires')) < new Date()) {
        localStorage.clear()

        return
      }

      let browserStore = JSON.parse(localStorage.getItem('store'))

      if (browserStore) {
        console.log(browserStore[this.localStoragePath])
        return browserStore[this.localStoragePath]
      }
    }
  },
  setCollectionLocalStorage (collection) {
    if (typeof (Storage) !== 'undefined' && this.localStoragePath) {
      let browserStore = JSON.parse(localStorage.getItem('store'))
      if (!browserStore) {
        browserStore = {}
      }

      browserStore[this.localStoragePath] = collection
      localStorage.setItem('store', JSON.stringify(browserStore))

      let d = new Date()
      let v = new Date()
      v.setMinutes(d.getMinutes() + 5)

      localStorage.setItem('expires', String(v.getTime()))
    }
  }
}

export default baseState
