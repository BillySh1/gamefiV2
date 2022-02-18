<template>
  <div :class="$route.name == 'home' ? 'box' : 'box colored_box'">
    <div v-if="$route.name == 'home'" class="wallet_box">
      <InjectWallet />
    </div>
    <div v-else class="page_title">
      <img class="title_badge" src="../assets/common/active_title.png" alt="" />
      {{ title }}
    </div>
    <div class="currency_menu">
      <div class="currency_item" v-for="item in list" :key="item.key">
        <img class="img_left" :src="item.img" alt="" />
        {{ item.value }}
        <img
          class="img_right"
          src="../assets/common/currency_plus.png"
          alt=""
        />
      </div>
    </div>
    <div class="icon_box">
      <img class="icon" src="../assets/common/notice.svg" alt="" />
      <img class="icon" src="../assets/common/lang.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import InjectWallet from "./inject_wallet.vue";
export default {
  name: "common_page_header",
  props: ["title"],
  components: {
    InjectWallet,
  },
  setup() {
    const data = reactive({
      list: [
        {
          key: "mmc",
          img: require("../assets/common/mmc.png"),
          value: 1000,
        },
        {
          key: "m3t",
          img: require("../assets/common/m3t.png"),
          value: 1000,
        },
        {
          key: "card",
          img: require("../assets/common/card.png"),
          value: 1000,
        },
        {
          key: "grain",
          img: require("../assets/common/grain.png"),
          value: 1000,
        },
        {
          key: "drum",
          img: require("../assets/common/drum.png"),
          value: 1000,
        },
      ],
    });

    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
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
  font-size: 4rem;
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
  font-size: 2rem;
  display: flex;
  align-items: center;
  font-family: SF Pro Text;
  font-style: italic;
  font-weight: 700;
  -webkit-text-stroke: 0.86px solid #231008;
}
.currency_item {
  background: #00000042;
  margin: 0 4rem;
  display: flex;
  align-items: center;
}
.img_left {
  height: 4rem;
  transform: translateX(-50%);
}
.img_right {
  height: 4rem;
  transform: translateX(50%);
}
.icon_box {
  place-self: flex-end;
}
.icon {
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.5em;
}
</style>
