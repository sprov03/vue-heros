<template>
  <div class="col-sm-3">
    <div class="alert alert-info">
      <div class="col-xs-8">
        <h5>
          <input type="checkbox" @change="updateIdDone" v-model="localTodo.is_done">
          {{ todo.label }}
        </h5>
      </div>
      <div class="col-xs-4">
        <vue-button :on-click="deleteTodo" action="delete" class="pull-right"></vue-button>
        <router-link class="btn btn-warning pull-right" :to="{path: `/todos/${todo.id}/edit`}">Edit</router-link>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import vueButton from '../utilities/buttons/vue-button'

export default {
  name: 'top-todo',
  components: {
    vueButton
  },
  data () {
    return {
      deleting: false,
      updating: false,
      localTodo: {}
    }
  },
  props: ['todo'],
  beforeMount () {
    this.localTodo = _.clone(this.todo)
  },
  methods: {
    deleteTodo () {
      return this.$store.dispatch('todos/deleteInstance', this.todo)
    },
    updateIdDone () {
      this.updating = true
      let updatedInstance = _.clone(this.todo)
      const index = this.index
      updatedInstance.is_done = !updatedInstance.is_done

      this.$store.dispatch('todos/updateInstance', {updatedInstance, index})
        .then((response) => {
          this.updating = false
          this.localTodo = _.clone(response.data)
        })
        .catch(() => {
          this.localTodo = _.clone(this.todo)
        })
    }
  }
}
</script>

<style scoped>

</style>
