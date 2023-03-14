import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    user: {},
    products: [
      {
        id: 1,
        name: "Product 1",
        description: "This description is for the product one",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        price: 6500.99
      },
      {
        id: 2,
        name: "Product 2",
        description: "This description is for the product Two",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        price: 5500.99
      },
      {
        id: 3,
        name: "Product 4",
        description: "This description is for the product Three",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        price: 2500.99
      },
      {
        id: 4,
        name: "Product 5",
        description: "This description is for the product Four",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        price: 7500.99
      }
    ],
    currentProduct: null
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
    products(state) {
      return state.products
    },
    currentProduct(state) {
      return state.currentProduct
    },
  },
  mutations: {
    setToken(state, payload) {
      const token = payload.token
      const user = payload.user

      state.token = token
      state.user = user
    },
    clearData(state) {
      state.token = null
      state.user = {}
    },
    setCurrentProduct(state, payload) {
      state.currentProduct = payload
    },
  },
  actions: {
    loginUser(context, payload) {
      const expireTime = new Date().getTime() + (60 * 60 * 1000)
      const token = "db382r38r3b3908e3r432fiebuqwebu-dbwufm"
      const user = payload
      localStorage.setItem("token", token)
      localStorage.setItem("expireTime", expireTime)
      localStorage.setItem("user", JSON.stringify(user))
      context.commit("setToken", { user, token })

    },
    logOut(context) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("expireTime")
      context.commit("clearData")
    },
    autoLogin(context) {
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user"))
      const expireTime = localStorage.getItem("expireTime")
      const recentTime = new Date().getTime()

      if (recentTime > expireTime) {
        context.dispatch("logOut")
      } else {
        context.commit("setToken", { user, token })
      }

    },
    setProduct(context, payload) {
      const products = context.getters.products
      const product = products.find(prod => prod.id == payload)
      context.commit("setCurrentProduct", product)
    }
  },
  modules: {
  }
})
