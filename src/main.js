const tp = require("tp-js-sdk");

if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
  tp.rollHorizontal({
    horizontal: true,
  });
  tp.fullScreen({
    fullScreen: 1,
  });
  tp.popGestureRecognizerEnable({
    enable: false,
  });
  tp.forwardNavigationGesturesEnable({
    enable: false,
  });
  sessionStorage.setItem("fullScreen", '1');
}

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import lottie from "vue-lottie";
import store from "./store/index";
import { createToast } from "mosha-vue-toastify";
import "./style/toast.less";

const _app = createApp(App);
_app.config.globalProperties.$toast = createToast;
_app.component("Lottie", lottie);
_app.use(router);
_app.use(store);

_app.mount("#app");
