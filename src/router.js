import Vue from 'vue'
import VueRouter from 'vue-router'
import Error404 from './components/Error404.vue'
import Home from './components/Home.vue'
import Index from './components/Index.vue'
import Takt from './components/modules/Calculations/Takt.vue'
import Oee from './components/modules/Calculations/Oee.vue'

Vue.use(VueRouter)

export default new VueRouter({
    /*
     * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
     * it is only to be used only for websites.
     *
     * If you decide to go with "history" mode, please also open /config/index.js
     * and set "build.publicPath" to something other than an empty string.
     * Example: '/' instead of current ''
     *
     * If switching back to default "hash" mode, don't forget to set the
     * build publicPath back to '' so Cordova builds work again.
     */

  routes: [{
    path: '/',
    component: Index,
    children: [
        { path: '', component: Home },
        { path: 'takt', component: Takt },
        { path: 'oee', component: Oee }
    ]
  },
    { path: '*', component: Error404 } // Not found
  ]
})
