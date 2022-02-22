import { createStore } from "vuex";
import addressMap from "../constants/Address";
const store = createStore({
  state() {
    return {
      addressMap: addressMap,
    };
  },
});

export default store;
