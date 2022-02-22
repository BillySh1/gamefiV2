import { createStore } from "vuex";
import initWeb3 from "../utils/initWeb3";

import addressMap from "../constants/Address";
import AirDropABI from "../constants/AirDrop.json";

const c_map = {
  c_airdrop: {
    abi: AirDropABI.abi,
    address: addressMap.airdrop,
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

let _web3

initWeb3
  .Init(
    (addr) => {
      store.state.account = addr;
    },
    (provider) => {
      store.state.web3 = provider;
      _web3 = provider
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
