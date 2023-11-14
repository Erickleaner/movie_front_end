import request from '@/utils/request'

export function fetchCheckGroups() {
  return request({
    url: '/movie/checkGroups',
    method: 'get'
  })
}

export function fetchList(data) {
  return request({
    url: '/movie/list',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: `/movie`,
    method: 'put',
    data
  })
}

export function insert(data) {
  return request({
    url: `/movie`,
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: `/movie/${id}`,
    method: 'delete'
  })
}
