import request from "@/utils/request";

export function fetchList(data) {
  return request({
    url: '/manager-user/list',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: `/manager-user`,
    method: 'put',
    data
  })
}

export function insert(data) {
  return request({
    url: `/manager-user`,
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: `/manager-user/${id}`,
    method: 'delete'
  })
}
