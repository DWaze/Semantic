import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(BootstrapVue);

window.Vue = Vue;
Vue.router = router;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
