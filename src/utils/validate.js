/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  str = str.trim()
  if (!(/^1[3456789]\d{9}$/.test(str))) {
    return false
  } else {
    return true
  }
  // const valid_map = ['admin', 'editor', '13200000006']
  // return str.trim() >= 0
}

export function validPassword(str) {
  // const valid_map = ['admin', 'editor', '13200000006']
  return str.length < 6
}

export function validSno(str) {
  str = str.trim()
  if (!(/^(\d{9})$/.test(str))) {
    return false
  } else {
    return true
  }
}
