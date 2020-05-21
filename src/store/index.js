import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LOGIN = 'LOGIN';

const store = new Vuex.Store({
  state: {
    username: '',
    picture: ''
  },
  getters: {
    isAuthorized: state => {
      return !!state.username && !!state.picture;
    }
  },
  mutations: {
    [LOGIN]: (state, payload) => {
      state.username = payload.username;
      state.picture = payload.picture;
    }
  }
});

export default store;
