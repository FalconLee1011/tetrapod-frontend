import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
// import store from '../store'

const API_PREFIX = process.env.VUE_APP_API_PREFIX;
const socket = io(
  `${API_PREFIX}/io`,
  {
    autoConnect: false,
  },
  // { store }
);

Vue.use(
  VueSocketIOExt, 
  socket,
);

export default({})
