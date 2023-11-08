import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { dashboardRouter } from '@/router/modules/admin'
import { tableRouter } from '@/router/modules/table'

/* Router Modules */

export const adminRoutes = [
  dashboardRouter,
  tableRouter
  // 404 page must be placed at the end !!!
/*   { path: '*', redirect: '/404', hidden: true } */
]

export const userRoutes = [
  // 404 page must be placed at the end !!!
  /*   { path: '*', redirect: '/404', hidden: true } */
]

export const commonRoute = [
  {
    path: '/',
    redirect:'/home'
  }
]

export const constantRoutes = [
  {
    path: '/home',
    component: () => import('@/views/home/index'),
    name: 'home'
  },
  {
    path: '/detail',
    component: () => import('@/views/detail/index'),
    name: 'detail'
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  //管理员
]

//router for common (neither user nor admin)
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes.concat(commonRoute)
})

//router for admin (use reset not add)
const createAdminRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes.concat(adminRoutes)
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export function resetAdminRouter(){
  const newRouter = createAdminRouter()
  router.matcher = newRouter.matcher // reset router
}


export default router
