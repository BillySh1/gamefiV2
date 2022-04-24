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
const my_invite = () => import("../pages/invite/my_invite.vue");
const airdrop = () => import("../pages/airdrop/airdrop.vue");
const title = () => import("../pages/title/title.vue");
const notice = () => import("../pages/notice/notice.vue");
const storeDetail = () => import("../pages/store/store_detail.vue");
const storeSuccess = () => import("../pages/store/store_buy_success.vue");
const inviteBoard = () => import("../pages/invite/invite_board.vue");
const heroDetail = () => import("../pages/hero_detail/hero_detail.vue");
const upgradePage = () => import("../pages/upgrade/upgrade.vue");
const marketDetail = () => import("../pages/market/market_camp_detail.vue");
const order = () => import("../pages/market/order.vue");
const orderDetail = () => import("../pages/market/order_detail.vue");
const sell = () => import("../pages/market/sell.vue");
const allStarsEntry = () => import("../pages/all_stars/entry.vue");
const connect = () => import("../pages/error/connect.vue");
const testCoin = () => import("../pages/test/test.vue");
const search = () => import("../pages/search/search.vue");
const obtain = () => import("../pages/obtain/obtain.vue");

// 群英会战 start
const bf_choose = () => import("../pages/all_stars/entry_choose_camp.vue");
const bf_main = () => import("../pages/all_stars/main.vue");
const bf_store = () => import("../pages/all_stars/town/store.vue");
const bf_base = () => import("../pages/all_stars/town/city.vue");
const bf_stake = () => import("../pages/all_stars/town/stake.vue");
const bf_history = () => import("../pages/all_stars/history/history.vue");
const bf_casio = () => import("../pages/all_stars/caiso/casio.vue");
const bf_pool = () => import("../pages/all_stars/final_pool.vue");
const bf_staked_his = () => import("../pages/all_stars/caiso/bf_stake_his.vue");
const bf_casio_history = () =>
  import("../pages/all_stars/caiso/bf_history.vue");

// 攻城略地 start
const stk_entry = () => import("../pages/stake/entry.vue");
const stk_detail = () => import("../pages/stake/entry_detail.vue");
const stk_main = () => import("../pages/stake/main.vue");
const stk_choose = () => import("../pages/stake/choose_mission.vue");
const stk_go = () => import("../pages/stake/stake_go.vue");
const stk_income = () => import("../pages/stake/income.vue");
const stk_view = () => import("../pages/stake/staked_view.vue");

const router = createRouter({
  history: routerHistory,
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "err",
      redirect: "/home",
      component: connect,
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
      path: "/obtain",
      name: "obtain",
      component: obtain,
    },
    {
      path: "/invite",
      name: "invite",
      component: invite,
    },
    {
      path: "/myInvite",
      name: "my_invite",
      component: my_invite,
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
      path: "/orderDetail",
      name: "orderDetail",
      component: orderDetail,
    },
    {
      path: "/sell",
      name: "sell",
      component: sell,
    },
    {
      path: "/allStarsEntry",
      name: "allStarsEntry",
      component: allStarsEntry,
    },
    {
      path: "/testCoin",
      name: "testCoin",
      component: testCoin,
    },
    {
      path: "/bf_choose",
      name: "bf_choose",
      component: bf_choose,
    },
    {
      path: "/bf_main",
      name: "bf_main",
      component: bf_main,
    },
    {
      path: "/search",
      name: "search",
      component: search,
    },
    {
      path: "/bf_store",
      name: "bf_store",
      component: bf_store,
    },
    {
      path: "/bf_base",
      name: "bf_base",
      component: bf_base,
    },
    {
      path: "/bf_stake",
      name: "bf_stake",
      component: bf_stake,
    },
    {
      path: "/bf_history",
      name: "bf_history",
      component: bf_history,
    },
    {
      path: "/bf_casio",
      name: "bf_casio",
      component: bf_casio,
    },
    {
      path: "/bf_staked_his",
      name: "bf_staked_his",
      component: bf_staked_his,
    },
    {
      path: "/casio_bf_his",
      name: "bf_casio_history",
      component: bf_casio_history,
    },
    {
      path: "/bf_pool",
      name: "bf_pool",
      component: bf_pool,
    },
    {
      path: "/stk_entry",
      name: "stk_entry",
      component: stk_entry,
    },
    {
      path: "/stk_story",
      name: "stk_story",
      component: stk_detail,
    },
    {
      path: "/stk_main",
      name: "stk_main",
      component: stk_main,
    },
    {
      path: "/stk_choose",
      name: "stk_choose",
      component: stk_choose,
    },
    {
      path: "/stk_go",
      name: "stk_go",
      component: stk_go,
    },
    {
      path: "/stk_income",
      name: "stk_income",
      component: stk_income,
    },
    {
      path: "/stk_view",
      name: "stk_view",
      component: stk_view,
    },
  ],
});

export default router;
