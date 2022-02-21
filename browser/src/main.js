// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./libs/datalib";
import "./libs/iconlib";
import store from "./store";
import "./main.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

const vm = new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount("#app");

export default vm;
