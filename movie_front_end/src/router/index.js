import VueRouter from "vue-router";
import {dashboardRouter} from "@/router/modules/admin";
import {tableRouter} from "@/router/modules/table";


export const adminRoutes = [
  dashboardRouter,
  tableRouter
]


export let commonRoutes = [
  {
    path: '/',
    redirect:'/home'
  },
]

export let constantRoutes = [
  {
    path:'/home',
    name: 'home',
    component: () => import('@/views/home/index')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/detail/index'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404/index')
  }
]

const createRouter = (addRoutes) => {
  return new VueRouter({
    routes: constantRoutes.concat(addRoutes),
  })
}

//该系统中仅管理员需要动态变化权限
export function resetRouter(role) {
  if (role === 'admin'){
    const newRouter = createRouter(adminRoutes)
    router.matcher = newRouter.matcher
  }
}

//重置
export function clearRouter() {
  const newRouter = createRouter(commonRoutes)
  router.matcher = newRouter.matcher
}

const router = createRouter(commonRoutes)


export default router
