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

//如果Web服务器无法处理编码为application/json的请求
//启用该选项后，请求会以application/x-www-form-urlencoded作为MIME type，就像普通的HTML表单一样。
Vue.http.options.emulateJSON = true;

new Vue({
  el : "#app",
  components : {App},
  router,
  store
});
