import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import axios from './plugins/axios'
import sweetalert2 from './plugins/vue-sweetalert2.js'
import toastification from './plugins/vue-toastification.js'

// import VueSocketIO from 'vue-socket.io'
// const API_PREFIX = process.env.VUE_APP_API_PREFIX;
// const SOCKET_API = `${API_PREFIX}/socketIO`;

// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: SOCKET_API,
//     vuex: {
//       store,
//       actionPrefix: 'SOCKET_',
//       mutationPrefix: 'SOCKET_'
//     },
// }))

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  axios,
  sweetalert2,
  toastification,
  render: h => h(App)
}).$mount('#app')
