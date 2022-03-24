<template>
  <div :class="$route.name == 'home' ? 'box' : 'box colored_box'">
    <div v-if="$route.name == 'home'" class="wallet_box">
      <InjectWallet @exit="$emit('exit')" />
    </div>
    <div v-else class="page_title">
      <img class="title_badge" src="../assets/common/active_title.png" alt="" />
      {{ title }}
    </div>
    <div class="currency_menu">
      <div
        class="currency_item"
        v-for="(item, index) in list"
        :key="item.key"
        :style="index != 2 ? 'width: 10rem' : ''"
      >
        <img class="img_left" :src="item.img" alt="" />
        <div class="value">
          {{ item.value }}
        </div>
        <img
          class="img_right"
          src="../assets/common/currency_plus.png"
          @click="() => $router.push({ name: item.href })"
        />
      </div>
    </div>
    <div class="icon_box">
      <img
        @click="$router.push({ name: 'notice' })"
        class="icon"
        src="../assets/common/notice.svg"
        alt=""
      />
      <img class="icon" src="../assets/common/lang.svg" alt="" />
      <img
        v-if="isMobile"
        @click="exitFullScreen"
        class="icon"
        :src="getScreenAciton"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onBeforeMount } from "vue";
import InjectWallet from "./inject_wallet.vue";
import initWeb3 from "../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "common_page_header",
  props: ["title"],
  components: {
    InjectWallet,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      account: "",
      web3: "",
      list: [
        {
          key: "mmc",
          img: require("../assets/common/mmc.png"),
          value: 0,
        },
        {
          key: "m3t",
          img: require("../assets/exchange/coin.png"),
          value: 0,
          href: "exchange",
        },
        {
          key: "card",
          img: require("../assets/common/card.png"),
          value: 0,
          href: "mint",
        },
        {
          key: "grain",
          img: require("../assets/common/grain.png"),
          value: 0,
          href: "store",
        },
        {
          key: "drum",
          img: require("../assets/common/drum.png"),
          value: 0,
          href: "store",
        },
      ],
      isFull: true,
    });
    const isMobile = computed(() => {
      if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    });
    const getScreenAciton = computed(() => {
      return data.isFull
        ? require("../assets/common/exitFullScreen.png")
        : require("../assets/common/fullScreen.png");
    });
    const exitFullScreen = () => {
      const tp = require("tp-js-sdk");
      const isF = sessionStorage.getItem("fullScreen");
      if (isF == 1) {
        tp.fullScreen({
          fullScreen: 0,
        });
        sessionStorage.setItem("fullScreen", "0");
        data.isFull = false;
      } else {
        tp.fullScreen({
          fullScreen: 1,
        });
        sessionStorage.setItem("fullScreen", "1");
        data.isFull = true;
      }
      // const isPcFull = document.webkitIsFullScreen || document.isFullScreen;
      // if (isMobile.value) {
      //   const tp = require("tp-js-sdk");
      //   if (sessionStorage.getItem("fullScreen")) {
      //     tp.fullScreen({
      //       fullScreen: 0,
      //     });
      //     sessionStorage.setItem("fullScreen", false);
      //   } else {
      //     tp.fullScreen({
      //       fullScreen: 1,
      //     });
      //     sessionStorage.setItem("fullScreen", true);
      //   }
      // } else {
      //   if (!isPcFull) {
      //     document.documentElement.requestFullscreen();
      //     sessionStorage.setItem("fullScreen", true);
      //   } else {
      //     document.exitFullscreen();
      //     sessionStorage.setItem("fullScreen", false);
      //   }
      // }
      // data.isFull = sessionStorage.getItem("fullScreen");
    };
    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      data.isFull = sessionStorage.getItem("fullScreen");
      await getInfo();
    });
    const getInfo = async () => {
      const mmc = store.state.c_mmc;
      const shop = store.state.c_richShop;
      const hero = store.state.c_hero;
      const m3t = store.state.c_m3t;
      const cardNum = await hero.methods.cardList(data.account).call();
      const mmcBalance = await mmc.methods.balanceOf(data.account).call();
      const m3tBalance = await m3t.methods.balanceOf(data.account).call();
      data.list[0].value = data.web3.utils
        .fromWei(mmcBalance, "ether")
        .split(".")[0];
      data.list[1].value = data.web3.utils
        .fromWei(m3tBalance, "ether")
        .split(".")[0];
      data.list[2].value = cardNum.length;
      data.list[3].value = await shop.methods
        .balanceOf(data.account, 12)
        .call();
      data.list[4].value = await shop.methods
        .balanceOf(data.account, 11)
        .call();
    };
    const refData = toRefs(data);
    return {
      ...refData,
      exitFullScreen,
      isMobile,
      getScreenAciton,
    };
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.8rem;
  height: 4rem;
  z-index: 100;
}
.colored_box {
  background: linear-gradient(
    90.07deg,
    #420606 -0.03%,
    rgba(63, 10, 10, 0.956468) 12.78%,
    rgba(102, 30, 30, 0.932711) 17.89%,
    rgba(71, 13, 13, 0.91001) 24.48%,
    rgba(61, 11, 11, 0.8125) 47.11%,
    rgba(39, 33, 33, 0) 96.81%
  );
  justify-content: space-around;
}
.wallet_box {
  margin-left: 1rem;
}
.page_title {
  width: fit-content;
  position: relative;
}
.title_badge {
  max-width: 250%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.currency_menu {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 65%;
}
.currency_item {
  font-family: Arial, Helvetica, sans-serif;
  width: 6rem;
  background: #00000042;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  .value {
    max-width: 8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.img_left {
  height: 2rem;
  transform: translateX(-50%);
}
.img_right {
  cursor: pointer;
  height: 2rem;
  transform: translateX(50%);
}
.icon_box {
  place-self: flex-end;
  margin-right: 1rem;
}
.icon {
  cursor: pointer;
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.5em;
}
</style>
