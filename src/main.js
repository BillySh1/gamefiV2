import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import lottie from "vue-lottie";

const _app = createApp(App);
_app.component("lottie", lottie);
_app.use(router);
_app.mount("#app");
