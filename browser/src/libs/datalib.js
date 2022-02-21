"use strict";

import Vue from "vue";
import axios from "axios";

const timeout = 1000 * 60;

import vm from "@/main";

let config = {
  baseURL: "/api",
  timeout,
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    //如果失败的状态码为401
    let { status, data } = error.response;
    console.log(data);
    if (status === 401) {
      vm.$store.dispatch("logout"); //退出登录
      // vm.$router.push('/home/user/login'); //去登录页重新登录
    } else {
      if (data.msg) {
        vm.$message.error(data.msg);
      } else {
        vm.$message.error("请求出错，请稍后重试");
      }
    }

    return Promise.reject(error);
  }
);

Plugin.install = function (Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default _axios;
