import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '../components/HelloWorld'
import TopForms from '../components/forms/forms'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/heroes', name: 'HelloWorld', component: HelloWorld},
    {path: '/forms', name: 'Forms', component: TopForms}
  ]
})
