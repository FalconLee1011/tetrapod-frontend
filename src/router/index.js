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
import orderTracking from '../components/tracking/order-tracking.vue';
import orderTrackingItself from '../components/tracking/order-tracking-tracking.vue';
import checkout from '../components/checkout.vue'
import profile from '../components/profile.vue'
import history from '../components/history.vue'
import search from '../components/misc/search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: { name: 'home' }
  },
  {
    name: "home",
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
  },{
    path: "/product-management",
    component: product_manager
  },
  {
    path: "/order-tracking",
    component: orderTracking
  },
  {
    path: "/order-tracking/:id",
    component: orderTrackingItself
  },
  {
    path: "/checkout",
    component: checkout
  },
  {
    path: "/profile",
    component: profile
  },
  {
    path: "/history",
    component: history
  },
  {
    path: "/search_bar",
    component: search
  }
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
  const authRequired = to.matched.some((route) => route.meta.authRequired) || true
  const redirectLocationWhenAuthFailed = to.matched.some((route) => route.meta.redirectLocationWhenAuthFailed) || undefined

  let user = window.localStorage.getItem('username');
  let token = window.localStorage.getItem('token');
  
  const res = await store.dispatch("auth");
  
  // if (authRequired && !res) { return; }
  if (!res) { 
    if(redirectLocationWhenAuthFailed != undefined && redirectLocationWhenAuthFailed != ""){ router.push(redirectLocationWhenAuthFailed) }
    return next(); 
  }
  if(!store.getters.authPassed)
    store.commit('setToken', { id: token, username: user });
  return next()
})

export default router
