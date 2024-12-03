import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    opinions: [],
    user: {
      loggedIn: false,
      username: '',
      profilePic: '', 
    },
  },
  mutations: {
    addOpinion(state, opinion) {
      state.opinions.push(opinion);
    },
    setUser(state, user) {
      state.user.loggedIn = true;
      state.user.username = user.username;
      state.user.profilePic = user.profilePic; 
    },
    logout(state) {
      state.user.loggedIn = false;
      state.user.username = '';
      state.user.profilePic = '';
    },
  },
  actions: {
    addOpinion({ commit }, opinion) {
      commit('addOpinion', opinion);
    },
    login({ commit }, user) {
      commit('setUser', user); 
    },
    logout({ commit }) {
      commit('logout'); 
    },
  },
  getters: {
    opinions: (state) => state.opinions,
    user: (state) => state.user,
  },
});
