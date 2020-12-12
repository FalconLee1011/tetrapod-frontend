import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import home from '../components/Home.vue'
import test from '../components/Test.vue'
import market from '../components/market.vue'
import upload from '../components/upload_product.vue'
import product_page from '../components/product_page'
import cart from '../components/cart.vue'
import product_manager from '../components/product_manager.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: home
  },
  {
    path: "/home",
    component: home
  },
  {
    path: "/test",
    component: test
  },
  {
    path: "/login",
    component: home
  },
  {
    path: "/merchant/:id",
    component: product_page
  },
  {
    path: "/market",
    component: market
  }
  ,{
    path: "/upload",
    component: upload
  },
  {
    path: "/cart",
    component: cart
  },
  {
    path: "/product_manager",
    component: product_manager
  },
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from, next) => {
  // eslint-disable-next-line no-unused-vars
  const authRequired = to.matched.some((route) => route.meta.authRequired) || false

  let user = window.localStorage.getItem('username');
  let token = window.localStorage.getItem('token');
  
  // const res = await store.actions.auth();
  const res = true;
  
  if (authRequired && !res) {
    location.href = '/login';
    return;
  }
  if(!store.getters.authPassed)
    store.commit('setToken', { id: token, username: user });
  return next()
})

export default router
