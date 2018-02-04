<template>
  <div v-if="index <= 3" class="col-sm-3">
    <div class="alert alert-info">
      <h3>{{ resource.name }}</h3>
      <input class="resource-control" type="text" v-model="localResource.name">
      <button class="btn btn-primary" @click="updateResource">Update<span v-if="updating">ing...</span></button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'top-resource',
  data () {
    return {
      localResource: null,
      updating: false
    }
  },
  props: ['resource', 'index'],
  beforeMount: function () {
    this.localResource = _.clone(this.resource)
  },
  methods: {
    updateResource () {
      const index = this.index
      const updatedResource = _.clone(this.localResource)
      this.updating = true

      this.$store.dispatch('updateResource', {updatedResource, index})
        .then(() => {
          this.updating = false
        })
    }
  }
}
</script>

<style scoped>

</style>
