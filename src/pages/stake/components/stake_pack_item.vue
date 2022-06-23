<template>
  <div class="stake_item">
    <img class="bg" src="../../../assets/stake/stake/stk_itm_bg.png" alt="" />
    <div class="stake_item_card" >
      222
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "stake_pack_item",
  props: ["info"],
  setup() {
    const data = reactive({});
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.stake_item {
  cursor: pointer;
  width: 100%;
  &:hover {
    opacity: 0.8;
  }
  position: relative;
  .bg {
    width: 100%;
    height: auto;
  }
  .stake_item_card {
    position: absolute;
    width: 95%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    
  }
}


</style>