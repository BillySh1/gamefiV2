import { createRouter, createWebHashHistory } from "vue-router";

const routerHistory = createWebHashHistory();

const _mint = import("../pages/mint/mint.vue");

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      redirect: "/mint",
    },
    {
      path: "/mint",
      component: _mint,
    },
  ],
});

export default router;
