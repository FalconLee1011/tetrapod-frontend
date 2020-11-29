import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/Home.vue'
import test from '../components/Test.vue'
import signup from '../components/signup.vue'

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
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
