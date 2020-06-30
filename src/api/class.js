import request from '@/utils/request'

export function getClassList(params) {
  return request({
    url: '/class/getClassList',
    method: 'get',
    params
  })
}

export function addClass(data) {
  return request({
    url: '/class/addClass',
    method: 'post',
    data
  })
}

export function addSchool(data) {
  return request({
    url: '/school/addSchool',
    method: 'post',
    data
  })
}

export function addDepartment(data) {
  return request({
    url: '/school/addDepartment',
    method: 'post',
    data
  })
}
