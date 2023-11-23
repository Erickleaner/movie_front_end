import request from '@/utils/request'


export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data: data
  })
}

export function verifyAsk(data) {
  return request({
    url: '/user/verifyAsk',
    method: 'get',
    params: data
  })
}


export function checkUsername(data) {
  return request({
    url: '/user/checkUsername',
    method: 'get',
    params: data
  })
}


export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
