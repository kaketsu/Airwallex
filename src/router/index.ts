import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '../components/Login.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

// SPA场景下, process.env.BASE_URL, 需要手动替换成 TLB 上配置的 path
// 很遗憾, 脚手架无法支持这点
const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

export default router;
