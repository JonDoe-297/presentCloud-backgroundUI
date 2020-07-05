import { login, logout, getInfo, register } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    // const userMsg = qs.stringify({
    //   username: username,
    //   password: password
    // })
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log('this login')
        console.log(response)
        // const { data } = response
        if (response.data.roleList[0].role_name === 'student') {
          reject('学生账号禁止登入')
          Message({
            message: '学生账号禁止登入',
            type: 'error',
            duration: 5 * 1000
          })
        } else {
          commit('SET_TOKEN', response.token)
          setToken(response.token)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response.data
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        // const { name } = data.username
        // const { id } = data.userid
        if (data.roleList[0].role_name === 'student') {
          reject('学生账号禁止登入')
        } else {
          const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
          commit('SET_NAME', data.username)
          commit('SET_ID', data.userid)
          commit('SET_ROLES', data.roleList[0].role_description)
          commit('SET_AVATAR', avatar)
          resolve(data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user register
  register({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      register(userInfo).then(response => {

        // const { data } = response
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

