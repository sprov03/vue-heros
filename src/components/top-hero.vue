<template>
  <div v-if="index <= 3" class="col-sm-3">
    <div class="alert alert-info">
      <h3>{{ hero.name }}</h3>
      <input class="form-control" type="text" v-model="localHero.name">
      <button class="btn btn-primary" @click="updateHero">Update<span v-if="updating">ing...</span></button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'top-hero',
  data () {
    return {
      localHero: null,
      updating: false
    }
  },
  props: ['hero', 'index'],
  beforeMount: function () {
    this.localHero = _.clone(this.hero)
  },
  methods: {
    updateHero () {
      const index = this.index
      const updatedHero = _.clone(this.localHero)
      this.updating = true

      this.$store.dispatch('updateHero', {updatedHero, index})
        .then(() => {
          this.updating = false
        })
    }
  }
}
</script>

<style scoped>

</style>
