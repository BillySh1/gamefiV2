<template>
  <div class="stake_item">
    <img class="bg" src="../../../assets/stake/stk_btn_bg.png" alt="" />
    2
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "stake_item",
  components: {},
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
  .empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    font-size: 1.5rem;
  }
  .stake_item_card {
    position: absolute;
    width: 95%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.power_box {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
}
</style>