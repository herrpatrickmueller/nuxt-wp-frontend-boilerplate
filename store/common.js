export const state = () => ({
  meta: null,
  menus: null,
})

export const actions = {
  meta({commit}, payload) {
    commit('setMeta', payload);
  },
  menus({commit}, payload) {
    commit('setMenus', payload);
  }
}

export const mutations = {
  setMeta(state, payload) {
    state.meta = payload;
  },
  setMenus(state, payload) {
    state.menus = payload;
  },
}

export const getters = {
  meta: (state) => {
    return state.meta;
  },
  menus: (state) => {
    return state.menus;
  },
  mainMenu: (state) => {
    return state.menus && state.menus.main 
      ? state.menus.main
      : null;
  },
}
