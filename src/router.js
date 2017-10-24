import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => System.import(`@/${component}.vue`)
}

function loadPages (component) {
  // '@' is aliased to src/components
  return () => System.import(`@/modules/${component}.vue`)
}

export default new VueRouter({
  routes: [{
    path: '/login',
    component: load('Login')
  },
  {
    path: '/app',
    component: load('Index'),
    children: [
      { path: '', component: load('Home') },
      { path: '/home', component: load('Home') },
      { path: '/takt', component: loadPages('Takt') },
      { path: '/pareto', component: loadPages('Pareto') },
      { path: '/oee', component: loadPages('Oee') },
      { path: '/obc', component: loadPages('Obc') },
      { path: '/kanban', component: loadPages('Kanban') }
    ]
  },
    // Always leave this last one
  { path: '*', component: load('Error404') } // Not found
  ]
})
