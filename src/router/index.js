import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '../components/heroes/HelloWorld'
import TopForms from '../components/forms/forms'
import Todos from '../components/todos/todos'
import TodosCreate from '../components/todos/create'
import TodosEdit from '../components/todos/edit'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/heroes', name: 'HelloWorld', component: HelloWorld},
    {path: '/forms', name: 'Forms', component: TopForms},
    {path: '/todos', name: 'Todos', component: Todos},
    {path: '/todos/:todoId/edit', name: 'Todos Edit', component: TodosEdit},
    {path: '/todos/create', name: 'Todos Create', component: TodosCreate}
  ]
})
