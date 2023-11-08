import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'

import './icons' // icon

import VueRouter from 'vue-router'
import router from '@/router'
import Vuex from 'vuex'

import './permission' // permission control

import store from './store'

import * as filters from './filters' // global filters

//import 'element-ui/lib/theme-chalk/index.css'

if (process.env.NODE_ENV === 'production') {
/*   const { mockXHR } = require('../mock')
  mockXHR() */
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})
Vue.use(VueRouter)
Vue.use(Vuex)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
