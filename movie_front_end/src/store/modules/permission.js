import { adminRoutes } from '@/router'

const state = {
  routes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

//仅管理员需要
const actions = {
  generateRoutes({ commit }, role) {
    return new Promise(resolve => {
      let accessedRoutes = []
      if (role === 'admin') {
        accessedRoutes = adminRoutes || []
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve()
    })
  },
  clearRoutes({ commit } ){
    commit('SET_ROUTES',[])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
