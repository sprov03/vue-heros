<template>
  <div class="hello">
    <h1>Top 4 Forms</h1>
    <div v-if="topForms.length">
      <div v-for="(form, index) in topForms" :key="form.id">
        <top-form :form="form" :index="index"></top-form>
      </div>
    </div>
    <div v-else>
      loading forms...
    </div>
  </div>
</template>

<script>
import topForm from './top-form'

export default {
  name: 'Forms',
  components: {
    topForm
  },
  data () {
    return {
    }
  },
  computed: {
    forms: function () {
      return this.$store.getters['forms/collection']
    },
    topForms () {
      return this.forms.slice(0, 4)
    }
  },
  mounted: function () {
    this.$store.dispatch('forms/getCollection')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
