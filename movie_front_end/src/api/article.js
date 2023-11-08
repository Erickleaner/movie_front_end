import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/article/list',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: `/article`,
    method: 'put',
    data
  })
}

export function insert(data) {
  return request({
    url: `/article`,
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: `/article/${id}`,
    method: 'delete'
  })
}
