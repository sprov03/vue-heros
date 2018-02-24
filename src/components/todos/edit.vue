<template>
  <div class="hello">
    <h1>Edit Todo</h1>
    <div class="clearfix"></div>
    <br>

    <todo-form v-if="todo" :todo="todo"></todo-form>
  </div>
</template>

<script>

import todoForm from './form'

export default {
  name: 'todos',
  components: {
    todoForm
  },
  computed: {
    todoId () {
      return parseInt(this.$router.currentRoute.params.todoId)
    },
    todo () {
      return this.todos.find((todo) => todo.id === this.todoId)
    },
    todos () {
      return this.$store.state.todos.collection
    }
  },
  mounted: function () {
    this.$store.dispatch('todos/getInstance', this.todoId)
  }
}
</script>
