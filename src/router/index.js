import { createRouter, createWebHashHistory } from "vue-router";

const routerHistory = createWebHashHistory();

const mint = import("../pages/mint/mint.vue");
const mint_detail = import('../pages/mint/mint_detail.vue')

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      redirect: "/mint",
    },
    {
      path: "/mint",
      name:'mint',
      component: mint,
    },
    {
      path:"/mintDetail",
      name:'mint_detail',
      component: mint_detail
    }
  ],
});

export default router;
