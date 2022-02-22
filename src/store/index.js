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
    abi: TrainingABI,
    address: addressMap.training,
  },
};

const store = createStore({
  state() {
    return {
      account: "",
      web3: "",
      c_airdrop: "",
    };
  },
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
