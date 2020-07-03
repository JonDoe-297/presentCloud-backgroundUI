import request from '@/utils/request'

export function getFilesByUserId(params) {
  return request({
    url: '/file/getFilesByUserId',
    method: 'get',
    params
  })
}

export function upload(params) {
  return request({
    url: '/file/upload',
    method: 'post',
    params
  })
}

export function downloadByFilepathId(params) {
  return request({
    url: '/file/downloadByFilepathId',
    method: 'get',
    params
  })
}

export function deleteFileByFilepathId(params) {
  return request({
    url: '/file/deleteFileByFilepathId',
    method: 'get',
    params
  })
}
