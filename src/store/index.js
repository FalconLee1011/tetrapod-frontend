import Vue from 'vue'
import Vuex from 'vuex'

const API_PREFIX = process.env.VUE_APP_API_PREFIX;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: undefined,
    username: undefined,
    authPassed: false,
  },
  getters:{
    token: (state) => state.token,
    username: (state) => state.username,
    authPassed: (state) => state.authPassed,
  },
  mutations: {
    setToken(state, arg){
      console.log(arg.username);
      state.token = arg.id;
      if(arg.username !== undefined) state.username = arg.username;
      window.localStorage.setItem('token', arg.id);
      window.localStorage.setItem('username', arg.username);
      state.authPassed = true;
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    settoken({commit, state}, arg){
      console.log(arg.username);
      commit('settoken', { id: arg.id, username: arg.username });
    },
    ///////////////////// IMPORTANT /////////////////////
    // * FOLLOWING FUNCTION auth() IS UNTESTED AND UNDER DEVELOPMENT
    // * RESERVED FOR FURTHER DEVELOPMENT
    ///////////////////// IMPORTANT /////////////////////
    // eslint-disable-next-line no-unused-vars
    async auth({commit, state}){
      let user = window.localStorage.getItem('username');
      let token = window.localStorage.getItem('token');

      let res = await Vue.axios.post(`${API_PREFIX}/auth/validate`, {token: token});
      if(res.data) {
        commit('settoken', { id: token, username: user });
        return true;
      }
      return false;
    },
    testFunc({commit, state}){
      console.log(commit);
      console.log(state);
    }
  },
  modules: {
  }
})
