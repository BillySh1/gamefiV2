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
  sessionStorage.setItem("fullScreen", "1");
}

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import lottie from "vue-lottie";
import store from "./store/index";
import { createToast } from "mosha-vue-toastify";
import "./style/toast.less";
import i18n from './i18n'

const _app = createApp(App).use(i18n).use(i18n);
_app.config.globalProperties.$toast = createToast;
_app.config.globalProperties.resolveAssets = (path) => {
  const ipfs_host =
    "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/";
  return ipfs_host + path;
};
_app.component("Lottie", lottie);
_app.use(router);
_app.use(store);

_app.mount("#app");
