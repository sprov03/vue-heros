<template>
  <div class="hello">
    <h1>Top 4 Todos</h1>
    <div class="col-xs-12">
      <router-link class="btn btn-primary btn-block" to="/todos/create">Add Todo</router-link>
    </div>
    <div class="clearfix"></div>
    <br>
    <div class="col-xs-12">
      <div v-if="todosLoaded">
        <div v-if="todos.length">
          <div class="row">
            <div v-for="(todo, index) in todos" :key="todo.id">
              <top-todo :todo="todo" :index="index"></top-todo>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="col-xs-12">
            <div class="alert alert-info row">
              You have no todos
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        loading todos...
      </div>
    </div>

  </div>
</template>

<script>
import topTodo from './top-todo'

export default {
  name: 'Todos',
  components: {
    topTodo
  },
  data () {
    return {
    }
  },
  computed: {
    todos: function () {
      return this.$store.state.todos.collection
    },
    todosLoaded: function () {
      return this.$store.state.todos.collectionLoaded
    }
  },
  mounted: function () {
    this.$store.dispatch('todos/getCollection')
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
