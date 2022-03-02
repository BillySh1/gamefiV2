import { createRouter, createWebHashHistory } from "vue-router";

const routerHistory = createWebHashHistory();

const mint = () => import("../pages/mint/mint.vue");
const mint_detail = () => import("../pages/mint/mint_detail.vue");
const minting = () => import("../pages/mint/minting.vue");
const home = () => import("../pages/index/index.vue");
const store = () => import("../pages/store/store.vue");
const pack = () => import("../pages/pack/pack.vue");
const market = () => import("../pages/market/market.vue");
const exchange = () => import("../pages/exchange/exhcange.vue");
const mix = () => import("../pages/mix/mix.vue");
const reborn = () => import("../pages/reborn/reborn.vue");
const leader_board = () => import("../pages/leader_board/board.vue");
const swap = () => import("../pages/swap/swap.vue");
const invite = () => import("../pages/invite/invite.vue");
const airdrop = () => import("../pages/airdrop/airdrop.vue");
const title = () => import("../pages/title/title.vue");
const notice = () => import("../pages/notice/notice.vue");
const showItem = () => import("../components/buy_item_success.vue");
const storeDetail = () => import("../pages/store/store_detail.vue");
const storeSuccess = () => import("../pages/store/store_buy_success.vue");
const inviteBoard = () => import("../pages/invite/invite_board.vue");
const heroDetail = () => import("../pages/hero_detail/hero_detail.vue");
const upgradePage = () => import("../pages/upgrade/upgrade.vue");
const marketDetail = () => import("../pages/market/market_camp_detail.vue");
const order = () => import("../pages/market/order.vue");
const orderDetail = ()=>import('../pages/market/order_detail.vue')
const sell = () => import("../pages/market/sell.vue");

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
    {
      path: "/showItem",
      name: "showItem",
      component: showItem,
    },
    {
      path: "/storeDetail",
      name: "storeDetail",
      component: storeDetail,
    },
    {
      path: "/inviteBoard",
      name: "inviteBoard",
      component: inviteBoard,
    },
    {
      path: "/buySuccess",
      name: "buySuccess",
      component: storeSuccess,
    },
    {
      path: "/heroDetail",
      name: "heroDetail",
      component: heroDetail,
    },
    {
      path: "/upgrade",
      name: "upgrade",
      component: upgradePage,
    },
    {
      path: "/marketDetail",
      name: "marketDetail",
      component: marketDetail,
    },
    {
      path: "/order",
      name: "order",
      component: order,
    },
    {
      path:'/orderDetail',
      name:'orderDetail',
      component: orderDetail,
    },
    {
      path: "/sell",
      name: "sell",
      component: sell,
    },
  ],
});

export default router;
