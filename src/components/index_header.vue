<template>
  <div class="box">
    <div class="wallet_zone">
      <div class="chain_icon" >
        <img :src="chainIcon" alt="">
      </div>
      <div class="wallet_address"> 0xeded4c……91e3 </div>
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
import { reactive, toRefs, onMounted, computed } from "vue";
export default {
  name: "common_page_header",
  setup() {
    const chainIcon = computed(()=>{
      return require('../assets/index/chainIcon/bsc.svg')
    })
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
      chainIcon
    };
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  position: absolute;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 4em;
}
.wallet_address{
  font-size: 1rem;
}
.chain_icon{
  border-radius: 100%;
  background:rgba(0, 0, 0, 0.5)
}
.page_title {
  position: relative;
}
.title_badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.currency_menu {
  font-size: 22.4px;
  display: flex;
  align-items: center;
  font-family: SF Pro Text;
  font-style: italic;
  font-weight: 700;
}
.currency_item {
  background: #00000042;
  margin: 0 48px;
  display: flex;
  align-items: center;
}
.img_left {
  transform: translateX(-50%);
}
.img_right {
  transform: translateX(50%);
}
.icon {
  width: 66px;
  height: 66px;
  margin-right: 24px;
}
</style>
