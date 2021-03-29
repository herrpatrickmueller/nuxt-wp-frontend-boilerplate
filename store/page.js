export const state = () => ({
  current: null,
})

export const actions = {
  current({commit}, payload) {
    const pageData = Array.isArray(payload)
      ? payload[0]
      : payload;
    commit('setCurrent', pageData)
  }
}

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload;
  },
}

export const getters = {
  current: (state) => {
    return state.current
  },
}
