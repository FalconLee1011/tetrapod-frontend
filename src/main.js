import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'
import VueSocketIO from 'vue-socket.io'

const SOCKET_API = "localhost:8080";

Vue.use(new VueSocketIO({
    debug: true,
    connection: SOCKET_API,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
}))

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
