import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import axios from './plugins/axios'
import sweetalert2 from './plugins/vue-sweetalert2.js'
import toastification from './plugins/vue-toastification.js'
import VueSocketIO from './plugins/VueSocketIOExt';

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  axios,
  sweetalert2,
  toastification,
  VueSocketIO,
  render: h => h(App)
}).$mount('#app')
