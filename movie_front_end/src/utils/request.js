import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Code from '@/utils/Code'

const VUE_APP_BASE_API = 'http://localhost:8080'

// create an axios instance
const service = axios.create({
  baseURL: VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    // 以统一的形式处理全部错误(认定返回code非20000都是错误)
    // 若code是20000则data一定正确
    if (res.code !== Code.REQUEST_OK) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      //一般错误也就提示、但是以下错误还有额外的要求
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === Code.ILLEGAL_TOKEN_ERR
        || res.code === Code.OTHER_CLIENTS_LOGGED_ERR
        || res.code === Code.TOKEN_EXPIRED) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      //reject便于请求函数只关注正确的处理
      //除了token过期基本没有什么需要进一步catch(已error显示错误了)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    //此处皆为网络或者系统的错误,无法拿到返回值
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
