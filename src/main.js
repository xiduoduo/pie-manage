import Vue from "vue";
import App from "@/App.vue";
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ol from "./../public/opelayer/ol.js";

import "@/utils/elementUi";

import "@/utils/rem";

import "normalize.css";
import "@/assets/styles/common.scss";

import "@/directive";
import "@/filter";

import router from "@/router";
import store from "@/store";

// import "/mock"; // mock 后端 API
Vue.prototype.ol = ol;
Vue.config.productionTip = false;
Vue.use(Element)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
