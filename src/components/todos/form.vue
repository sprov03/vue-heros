<template>
  <div>
    <basic-input-field
      v-model="localTodo.label"
      label="Label"
      :form-errors.sync="formErrors.label"
      :out-dated="outDated.label"
      :disabled="!localTodo">
    </basic-input-field>

    <basic-input-field
      v-model="localTodo.notes"
      label="Notes"
      :form-errors.sync="formErrors.notes"
      :out-dated="outDated.notes"
      :disabled="!localTodo">
    </basic-input-field>

    <basic-input-field
      v-model="localTodo.updated_at"
      label="Updated At"
      :form-errors.sync="formErrors.updated_at"
      :out-dated="outDated.updated_at"
      :disabled="!localTodo">
    </basic-input-field>

    <div class="checkbox">
      <label>
        <input type="checkbox" v-model="localTodo.is_done" :disabled="!localTodo"> Completed
      </label>
    </div>

    <router-link class="btn btn-warning" to="/todos">Back</router-link>
    <vue-button class="pull-right" :onClick="save" action="save" :formErrors="formErrors"></vue-button>
  </div>
</template>

<script>
import formUtilities from '../utilities/forms/mixin'
import _ from 'lodash'

export default {
  name: 'Todos',
  mixins: [formUtilities],
  props: ['todo'],
  data () {
    return {
      localTodo: {}
    }
  },
  mounted () {
    this.localTodo = _.clone(this.todo)
  },
  methods: {
    save () {
      return this.$store.dispatch('todos/saveInstance', this.handleOutDated(this.localTodo))
        .then((response) => {
          this.localTodo = response.data

          return response
        }, this.handleFormErrors)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
