import Vue from "vue";
import VueResource from "vue-resource"

import router from "./router/router";
import store from "./store/store";
import App from "./app";

import moment from "moment";

moment.locale("zh-cn");//日期与时间本地化
Vue.use(VueResource);
//开启debug模式
// Vue.config.debug = true
// window.log = console.log

//开发模式暂时使用跨域请求
Vue.http.get = Vue.http.jsonp;
Vue.http.post = Vue.http.jsonp;

new Vue({
  el : "#app",
  components : {App},
  router,
  store
});
