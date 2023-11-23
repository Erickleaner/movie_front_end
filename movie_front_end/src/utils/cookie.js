import Cookies from 'js-cookie'

const tokenKey = 'User-Token'

/**
 * 如果用户关闭了浏览器标签页或浏览器窗口
 * 那么前端应用程序将终止
 * Cookies 对象也将不再存在。
 */
export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token) {
  return Cookies.set(tokenKey, token)
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}
