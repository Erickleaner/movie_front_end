import router, {resetRouter} from './router'
import store from './store'
import {getToken} from "@/utils/cookie";
import {Message} from "element-ui";

const whiteList = ['/login','/register','/home','/detail']

//这里可以直接使用store?


router.beforeEach(async(to, from, next) => {

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = store.getters.role.toString() !== ''
      if (hasRoles) {
        next()
      } else {
        try {

          const {role} = await store.dispatch('user/getInfo')

          await store.dispatch('permission/generateRoutes', role)

          resetRouter(role)

          //must jump use this
          next({ path: '/' , replace: 'true'})

        } catch (error) {

          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
    }
  }
})

