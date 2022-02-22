import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import lottie from "vue-lottie";
import store from './store/index'

const _app = createApp(App);
_app.$text = 'sss'
_app.component("Lottie", lottie);
_app.use(router);
_app.use(store)
_app.mount("#app");
