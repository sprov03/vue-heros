<template>
  <div class="col-sm-3">
    <div class="alert alert-info">
      <div class="col-xs-8">
        <h5>
          <input type="checkbox" @change="updateTodo" v-model="localTodo.is_done" :disabled="updating">
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
      localTodo: {}
    }
  },
  props: ['todo'],
  beforeMount () {
    this.localTodo = _.clone(this.todo)
  },
  computed: {
    updating () {
      return this.$store.state.todos.pending.includes(this.localTodo.id)
    }
  },
  methods: {
    deleteTodo () {
      return this.$store.dispatch('todos/deleteInstance', this.todo)
    },
    updateTodo () {
      this.$store.dispatch('todos/saveInstance', this.localTodo)
        .then((response) => {
          this.localTodo = response.data
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
