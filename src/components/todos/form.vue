<template>
  <div>
    <basic-input-field v-model="todo.label" label="Label" :errors.sync="errors.label"></basic-input-field>
    <basic-input-field v-model="todo.notes" label="Notes" :errors.sync="errors.notes"></basic-input-field>

    <div class="checkbox">
      <label>
        <input type="checkbox" v-model="todo.is_done"> Completed
      </label>
    </div>

    <router-link class="btn btn-warning" to="/todos">Back</router-link>
    <vue-button class="pull-right" :onClick="save" action="save"></vue-button>
  </div>
</template>

<script>
import basicInputField from '../utilities/forms/basic-input-field'
import vueButton from '../utilities/buttons/vue-button'
export default {
  name: 'Todos',
  props: ['todo'],
  components: {
    basicInputField,
    vueButton
  },
  data () {
    return {
      errors: {}
    }
  },
  methods: {
    save () {
      return this.$store.dispatch('todos/saveInstance', this.todo)
        .then(() => {
          this.$router.push({path: '/todos'})
        })
        .catch((error) => {
          this.errors = error.response.data

          throw error
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
