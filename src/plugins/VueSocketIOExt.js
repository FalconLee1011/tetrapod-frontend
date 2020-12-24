import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

const API_PREFIX = "http://localhost:9001"
const socket = io(
  `${API_PREFIX}/io`,
  {
    autoConnect: false,
  },
);

Vue.use(
  VueSocketIOExt, 
  socket,
);

export default({})
