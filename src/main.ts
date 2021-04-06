import Vue from 'vue'
import App from './App.vue'
import router from './router';
import './assets/reset.less';
import 'ant-design-vue/dist/antd.css';
import './plugins/antdv';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
