<template>
  <div class="hello">
    <h1>Add Todo</h1>
    <div class="clearfix"></div>
    <br>

    <todo-form :todo="localTodo"></todo-form>
  </div>
</template>

<script>

import todoForm from './form'
import _ from 'lodash'

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
  computed: {
    defaultTodo () {
      return this.$store.state.todos.defaultInstance
    }
  },
  mounted: function () {
    this.localTodo = _.clone(this.defaultTodo)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
