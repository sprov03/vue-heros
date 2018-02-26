<template>
  <div>
    <basic-input-field
      v-model="localHero.name"
      :form-errors.sync="formErrors.name"
      :out-dated="outDated.name"
      :disabled="!localHero">
    </basic-input-field>

    <basic-input-field
      v-model="localHero.updated_at"
      label="Updated At"
      :form-errors.sync="formErrors.updated_at"
      :out-dated="outDated.updated_at"
      :disabled="!localHero">
    </basic-input-field>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.label}}

        <basic-input-field
          v-model="todo.label"
        ></basic-input-field>
      </li>
    </ul>

    <router-link class="btn btn-warning" to="/heroes">Back</router-link>
    <vue-button class="pull-right" :onClick="saveHero" action="save" :formErrors="formErrors"></vue-button>
  </div>
</template>

<script>
import formUtilities from '../utilities/forms/mixin'
import _ from 'lodash'

export default {
  name: 'Todos',
  mixins: [formUtilities],
  props: ['hero'],
  data () {
    return {
      localHero: {}
    }
  },
  mounted () {
    this.localHero = _.clone(this.hero)
  },
  computed: {
    todos () {
      return this.hero.todos
    }
  },
  methods: {
    saveHero () {
      return this.$store.dispatch('heroes/saveInstance', this.handleOutDated(this.localHero))
        .then((response) => {
          this.localHero = response.data

          return response
        }, this.handleFormErrors)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
