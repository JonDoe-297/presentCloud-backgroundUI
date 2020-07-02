import request from '@/utils/request'

export function getCheckinInfoList(params) {
  return request({
    url: '/checkin/getCheckinInfoList',
    method: 'get',
    params
  })
}

export function addCheckinInfo(params) {
  return request({
    url: '/checkin/addCheckinInfo',
    method: 'post',
    params
  })
}
