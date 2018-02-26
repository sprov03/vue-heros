<template>
  <div v-if="index <= 3" class="col-sm-3">
    <div class="alert alert-info">
      <h3>{{ hero.name }}</h3>

      <basic-input-field
        v-model="localHero.name"
        :form-errors.sync="formErrors.name"
        :out-dated="outDated.name">
      </basic-input-field>

      <router-link class="btn btn-warning" :to="{path: `/heroes/${localHero.id}/edit`}">Edit</router-link>

      <vue-button class="pull-right" :on-click="saveHero" action="save" :form-errors="formErrors"></vue-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import formUtilities from '../utilities/forms/mixin'

export default {
  name: 'top-hero',
  mixins: [formUtilities],
  data () {
    return {
      localHero: {}
    }
  },
  props: ['hero', 'index'],
  beforeMount: function () {
    this.localHero = _.clone(this.hero)
  },
  methods: {
    saveHero () {
      return this.$store.dispatch('heroes/saveInstance', this.handleOutDated(this.localHero))
        .then((response) => {
          this.localTodo = response.data
        }, this.handleFormErrors)
    }
  }
}
</script>

<style scoped>

</style>
