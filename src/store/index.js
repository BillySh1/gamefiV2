import { createStore } from "vuex";
import initWeb3 from "../utils/initWeb3";

import addressMap from "../constants/Address";
import AirDropABI from "../constants/AirDrop.json";
import ExchangeABI from "../constants/Exchange.json";
import InviteABI from "../constants/Invite.json";
import M3TTokenABI from "../constants/M3tToken.json";
import MMCTokenABI from "../constants/MemoryToken.json";
import RecruitABI from "../constants/Recruit.json";
import RichHeroABI from "../constants/RichHero.json";
import RichShopABI from "../constants/RichShop.json";
import TrainingABI from "../constants/Training.json";
import BattleABI from "../constants/Battle.json";
import BattleShopABI from "../constants/BattleShop.json";
import BetABI from "../constants/Bet.json";

const c_map = {
  c_airdrop: {
    abi: AirDropABI.abi,
    address: addressMap.airdrop,
  },
  c_exchange: {
    abi: ExchangeABI.abi,
    address: addressMap.exchange,
  },
  c_invite: {
    abi: InviteABI.abi,
    address: addressMap.invite,
  },
  c_m3t: {
    abi: M3TTokenABI.abi,
    address: addressMap.m3t,
  },
  c_mmc: {
    abi: MMCTokenABI.abi,
    address: addressMap.mmc,
  },
  c_recruit: {
    abi: RecruitABI.abi,
    address: addressMap.recruit,
  },
  c_hero: {
    abi: RichHeroABI.abi,
    address: addressMap.hero,
  },
  c_richShop: {
    abi: RichShopABI.abi,
    address: addressMap.shop,
  },
  c_training: {
    abi: TrainingABI.abi,
    address: addressMap.training,
  },
  c_usdt: {
    abi: MMCTokenABI.abi,
    address: addressMap.usdt,
  },
  // battle field
  c_battle: {
    abi: BattleABI.abi,
    address: addressMap.battle,
  },
  c_battle_shop: {
    abi: BattleShopABI.abi,
    address: addressMap.battleShop,
  },
  c_bet: {
    abi: BetABI.abi,
    address: addressMap.bet,
  },
};

const store = createStore({
  state() {
    return {
      account: "",
      web3: "",
      c_airdrop: "",
      toast_success: {
        type: "success",
        timeout: 3000,
        showCloseButton: false,
        showIcon: true,
        transition: "slide",
        hideProgressBar: true,
      },
      toast_info: {
        type: "info",
        timeout: 5000,
        showCloseButton: false,
        showIcon: true,
        transition: "zoom",
        hideProgressBar: true,
      },
      toast_error: {
        type: "danger",
        timeout: 3000,
        showCloseButton: false,
        showIcon: true,
        transition: "slide",
        hideProgressBar: true,
      },
    };
  },
  mutations: {},
});

let _web3;

initWeb3
  .Init(
    (addr) => {
      store.state.account = addr;
    },
    (provider) => {
      store.state.web3 = provider;
      _web3 = provider;
    }
  )
  .then(() => {
    const web3 = store.state.web3 || _web3;
    for (let key in c_map) {
      const item = c_map[key];
      store.state[key] = new web3.eth.Contract(item.abi, item.address);
    }
  });

export default store;
