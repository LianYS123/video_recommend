// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './libs/datalib'
import store from './store'
import {baseURL} from './config'


// Vue.prototype.$axios = axios;
Vue.prototype.baseURL = baseURL;
Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  components: { App },
  render: h => h(App),
}).$mount('#app')

export default vm;