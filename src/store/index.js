import Vue from 'vue'
import Vuex from 'vuex'

const API_PREFIX = process.env.VUE_APP_API_PREFIX;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: undefined,
    account: undefined,
    authPassed: false,
  },
  getters:{
    token: (state) => state.token,
    account: (state) => state.account,
    authPassed: (state) => state.authPassed,
  },
  mutations: {
    setToken(state, arg){
      console.log(arg.account);
      state.token = arg.id;
      if(arg.account !== undefined) state.account = arg.account;
      window.localStorage.setItem('token', arg.id);
      window.localStorage.setItem('account', arg.account);
      state.authPassed = true;
    },
    // eslint-disable-next-line no-unused-vars
    clearToken(state, arg){
      window.localStorage.setItem('token', undefined);
      window.localStorage.setItem('account', undefined);
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    setToken({commit, state}, arg){
      commit('setToken', { id: arg.id, account: arg.account });
    },
    // eslint-disable-next-line no-unused-vars
    deauth({commit, state}, arg){
      commit('clearToken');
    },
    // eslint-disable-next-line no-unused-vars
    async auth({commit, state}){
      let user = window.localStorage.getItem('account');
      let token = window.localStorage.getItem('token');
      
      let res = await Vue.axios.post(`${API_PREFIX}/auth/validate`, {token: token});
      if(res.data.result) {
        commit('setToken', { id: token, account: user });
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
