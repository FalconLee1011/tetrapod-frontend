import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/Home.vue'
import test from '../components/Test.vue'
import signup from '../components/signup.vue'
import login from '../components/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: home
  },
  {
    path: "/test",
    component: test
  },
  {
    path: "/signup",
    component: signup
  },
  {
    path: "/login",
    component: login
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
