import { createRouter, createWebHashHistory } from "vue-router";

const routerHistory = createWebHashHistory();

const mint = import("../pages/mint/mint.vue");
const mint_detail = import("../pages/mint/mint_detail.vue");
const minting = import("../pages/mint/minting.vue");
const home = import("../pages/index/index.vue");
const store = import("../pages/store/store.vue");
const pack = import("../pages/pack/pack.vue");
const market = import("../pages/market/market.vue");
const exchange = import("../pages/exchange/exhcange.vue");
const mix = import("../pages/mix/mix.vue");
const reborn = import("../pages/reborn/reborn.vue");
const leader_board = import("../pages/leader_board/board.vue");
const swap = import("../pages/swap/swap.vue");
const invite = import("../pages/invite/invite.vue");
const airdrop = import("../pages/airdrop/airdrop.vue");
const title = import("../pages/title/title.vue");
const notice = import("../pages/notice/notice.vue");

const router = createRouter({
  history: routerHistory,
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/mint",
      name: "mint",
      component: mint,
    },
    {
      path: "/mintDetail",
      name: "mint_detail",
      component: mint_detail,
    },
    {
      path: "/mintSuccess",
      name: "minting",
      component: minting,
    },
    {
      path: "/home",
      name: "home",
      component: home,
    },
    {
      path: "/store",
      name: "store",
      component: store,
    },
    {
      path: "/pack",
      name: "pack",
      component: pack,
    },
    {
      path: "/market",
      name: "market",
      component: market,
    },
    {
      path: "/exchange",
      name: "exchange",
      component: exchange,
    },
    {
      path: "/mix",
      name: "mix",
      component: mix,
    },
    {
      path: "/reborn",
      name: "reborn",
      component: reborn,
    },
    {
      path: "/leader",
      name: "leader",
      component: leader_board,
    },
    {
      path: "/swap",
      name: "swap",
      component: swap,
    },
    {
      path: "/invite",
      name: "invite",
      component: invite,
    },
    {
      path: "/airdrop",
      name: "airdrop",
      component: airdrop,
    },
    {
      path: "/title",
      name: "title",
      component: title,
    },
    {
      path: "/notice",
      name: "notice",
      component: notice,
    },
  ],
});

export default router;
