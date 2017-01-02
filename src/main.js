import Vue from "vue";
import router from "./router/router";
import store from "./store/store";
import App from "./app";

import VueResource from "vue-resource"

Vue.use(VueResource);
//开启debug模式
// Vue.config.debug = true
// window.log = console.log

Vue.http.get = Vue.http.jsonp;
Vue.http.post = Vue.http.jsonp;
//开启chrome浏览器允许跨域请求
//open -a Google\ Chrome.app --args --disable-web-security
new Vue({
  el : "#app",
  components : {App},
  router,
  store
});
