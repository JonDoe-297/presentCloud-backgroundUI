import request from '@/utils/request'

export function getClassList(params) {
  return request({
    url: '/class/getClassList',
    method: 'get',
    params
  })
}

export function getClassByClassnum(params) {
  return request({
    url: '/class/getClassByClassnum',
    method: 'get',
    params
  })
}

export function getClassDetail(params) {
  return request({
    url: '/class/getClassDetail',
    method: 'get',
    params
  })
}

export function getTeacher(params) {
  return request({
    url: '/class/getTeacher',
    method: 'get',
    params
  })
}

export function searchClass(params) {
  return request({
    url: '/class/searchClass',
    method: 'get',
    params
  })
}

export function removeStudent(params) {
  return request({
    url: '/class/removeStudent',
    method: 'get',
    params
  })
}

export function addStudent(params) {
  return request({
    url: '/class/addStudent',
    method: 'post',
    params
  })
}

export function addClass(params) {
  return request({
    url: '/class/addClass',
    method: 'get',
    params
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
