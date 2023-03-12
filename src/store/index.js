import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    user: {},
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    }
  },
  mutations: {
    setToken(state, payload) {
      const token = payload.token
      const user = payload.user

      state.token = token
      state.user = user
    }
  },
  actions: {
    loginUser(context, payload) {
      setInterval(() => {
        const expireTime = new Date().getTime() * 60 * 60 * 4
        const token = "db382r38r3b3908e3r432fiebuqwebu-dbwufm"
        const user = payload
        localStorage.setItem("token", token)
        localStorage.setItem("expireTime", expireTime)
        context.commit("setToken", { user, token })
      }, 500)

    },
  },
  modules: {
  }
})
