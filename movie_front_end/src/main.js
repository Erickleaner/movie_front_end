import Vue from 'vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.scss'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/styles/element-variables.scss'

import App from './App'

import router from '@/router'
import VueRouter from 'vue-router'
import './icons'
import './permission'
import store from "@/store";


Vue.use(Element)
Vue.use(VueRouter)

/**
 * add element-ui and css of theme-chalk
 * add global css
 * add modern alternative of css reset
 * add style scss for admin-system (index.scss and element-variables.scss)
 *
 * add VueRouter
 * add permission
 *
 * add Vuex
 *
 * add svg-icon
 */

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

