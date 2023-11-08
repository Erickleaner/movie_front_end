import router, { resetAdminRouter } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

//控制是否显示加载进度条旁边的旋转加载图标
NProgress.configure({ showSpinner: false }) // NProgress Configuration

//原本'/'不通过权限认证
//const whiteList = ['/login', '/auth-redirect','/']
//不需要重定向的白名单
const whiteList = ['/login', '/auth-redirect','/home','/detail'] // no redirect whitelist

//没token的情况下进入非白名单的path转向login
//有权限的情况下，根据roles决定/

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  //存在token一般即存储了UserInfo
  //若不存在UserInfo，通过二次hasRoles校验也能请求获取相关UserInfo
  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {

      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      //更多的情况是hasToken，但是store中不存储用户数据

      if (hasRoles) {
        next()
      } else {
        try {
          //获取用户信息为空，throw error
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes

          if (roles.includes('admin')) {
            resetAdminRouter()
          }else {}

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record

          // 替换当前路由而不是新增路由，不希望用户能够回退到前一个路由

          next({ ...to, replace: true })

        } catch (error) {

          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
          //next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    //console.log(to.path)
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      //next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
