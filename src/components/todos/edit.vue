<template>
  <div class="hello">
    <h1>Edit Todo</h1>
    <div class="clearfix"></div>
    <br>

    <todo-form :todo="localTodo"></todo-form>
  </div>
</template>

<script>

import todoForm from './form'

export default {
  name: 'Todos',
  components: {
    todoForm
  },
  data () {
    return {
      localTodo: {}
    }
  },
  mounted: function () {
    this.$store.dispatch('todos/getInstance', this.$router.currentRoute.params.todoId)
      .then((response) => {
        this.localTodo = response.data
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
