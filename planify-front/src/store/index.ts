import { createStore } from 'vuex';
import { User, State } from '@/types/types';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state: State, user: User) {
      state.user = user;
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.id);
    },
    setToken(state, token: string) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    },
  },
  actions: {
    login({ commit }, token: string) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      commit('setToken', token);
      commit('setUser', {
        username: decodedToken.username,
        id: decodedToken.id
      });
    },
    logout({ commit }) {
      commit('clearAuth');
    },
    checkAuth({ commit, state }) {
      if (state.token) {
        const decodedToken = JSON.parse(atob(state.token.split('.')[1]));
        const isExpired = decodedToken.exp && decodedToken.exp <= Math.floor(Date.now() / 1000);
        
        if (isExpired) {
          commit('clearAuth');
        } else {
          commit('setUser', {
            username: decodedToken.username,
            id: decodedToken.id
          });
        }
      }
    },
  },
  getters: {
    user: (state) => state.user,
    userId: (state) => state.user?.id, 
    token: (state) => state.token,
    isLoggedIn: (state) => !!state.token,
  },
});
