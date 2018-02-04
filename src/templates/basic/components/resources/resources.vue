<template>
  <div class="hello">
    <h1>Top 4 Resources</h1>
    <div v-if="resources.length">
      <div v-for="(resource, index) in resources" :key="resource.id">
        <top-resource :resource="resource" :index="index"></top-resource>
      </div>
    </div>
    <div v-else>
      loading resources...
    </div>
  </div>
</template>

<script>
import topResource from './top-resource'

export default {
  name: 'Resources',
  components: {
    topResource
  },
  data () {
    return {
    }
  },
  computed: {
    resources: function () {
      return this.$store.state.resources.paginatedResources.data.slice(0, 4)
    }
  },
  mounted: function () {
    this.$store.dispatch('getResources')
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
