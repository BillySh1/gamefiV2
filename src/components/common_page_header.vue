<template>
  <div class="box">
    <div class="page_title">招贤纳士</div>
    <div class="currency_menu">
      <div class="currency_item" v-for="item in list" :key="item.key">
        <img class="img_left" :src="item.img" alt="" />
        {{ item.value }}
        <img class="img_right" src="../assets/common/currency_plus.png" alt="" />
      </div>
    </div>
    <div class="icon_box">
      <img class="icon"  src="../assets/common/notice.svg" alt="" />
      <img class="icon" src="../assets/common/lang.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
export default {
  name: "common_page_header",
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
  height: 100px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: linear-gradient(
    90.07deg,
    #420606 -0.03%,
    rgba(63, 10, 10, 0.956468) 12.78%,
    rgba(102, 30, 30, 0.932711) 17.89%,
    rgba(71, 13, 13, 0.91001) 24.48%,
    rgba(61, 11, 11, 0.8125) 47.11%,
    rgba(39, 33, 33, 0) 96.81%
  );
  font-family: FZYanZhenQingKaiShuJF;
  font-size: 4rem;
  font-weight: 400;
}
.currency_menu {
  font-size: 0.35em;
  display: flex;
  align-items: center;
  font-family: SF Pro Text;
  font-style: italic;
  font-weight: 700;
}
.currency_item {
  background: #00000042;
  margin: 0 3rem;
  display: flex;
  align-items: center;
}
.img_left{
    transform: translateX(-50%);
}
.img_right{
    transform: translateX(50%);
}
.icon{
    width: 66px;
    height: 66px;
    margin-right: 24px;
}
</style>
