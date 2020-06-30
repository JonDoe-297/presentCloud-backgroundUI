import request from '@/utils/request'

export function getFilesByUserId(params) {
  return request({
    url: '/file/getFilesByUserId',
    method: 'get',
    params
  })
}

export function upload(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data
  })
}
