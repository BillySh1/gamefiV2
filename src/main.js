import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import lottie from "vue-lottie";
import store from './store/index';
import { createToast } from 'mosha-vue-toastify';
import './style/toast.less'

const _app = createApp(App);
_app.config.globalProperties.$toast = createToast
_app.component("Lottie", lottie);
_app.use(router);
_app.use(store)
_app.mount("#app");
