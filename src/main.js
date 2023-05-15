if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
  const tp = require("tp-js-sdk");
  if (tp) {
    tp.rollHorizontal({
      // 移动端横屏
      horizontal: true,
    });
    tp.fullScreen({
      // 移动端全屏
      fullScreen: 1,
    });
    sessionStorage.setItem("fullScreen", "1");
  }
}

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import lottie from "vue-lottie";
import store from "./store/index";
import { createToast } from "mosha-vue-toastify";
import "./style/toast.less";
import i18n from "./i18n";

const _app = createApp(App).use(i18n);
_app.config.globalProperties.$toast = createToast;
_app.config.globalProperties.resolveAssets = (path) => {
  const ipfs_host =
    "https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/";
  return ipfs_host + path;
};
_app.component("Lottie", lottie);
_app.use(router);
_app.use(store);

_app.mount("#app");
