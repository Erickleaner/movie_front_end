import request from "@/utils/request";

export function fetchCountries() {
  return request({
    url: '/manager-movie/countries',
    method: 'get'
  })
}

export function fetchTypes() {
  return request({
    url: '/manager-movie/types',
    method: 'get'
  })
}

export function fetchList(data) {
  return request({
    url: '/manager-movie/list',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: `/manager-movie`,
    method: 'put',
    data
  })
}

export function insert(data) {
  return request({
    url: `/manager-movie`,
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: `/manager-movie/${id}`,
    method: 'delete'
  })
}
