import {getInfo, login} from "@/api/user";
import {getToken, removeToken, setToken} from "@/utils/cookie";

const state = {
  token:'',
  name: '',
  avatar: '',
  introduction: '',
  role: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { token,role } = response.data
        commit('SET_TOKEN', token);
        setToken(token)
        resolve(role)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      //此处使用之前已经setter的token

      let token = (state.token === '' ? null:state.token) || getToken()

      getInfo(token).then(response => {
        const { data } = response

        //token无法获取到用户信息
        if (!data) {
          reject('验证失败，请重新登录！')
        }
        const { role, name, avatar, introduction } = data

        commit('SET_ROLE', role)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)

      }).catch(error => {
        reject(error)
      })
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', '')
      removeToken()
      resolve()
    })
  },
}

const user = {
  namespaced:true,
  state,
  mutations,
  actions
}
export default user
