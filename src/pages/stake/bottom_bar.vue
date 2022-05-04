<template>
  <div class="bottom">
    <div class="badge_icon">
      <img src="../../assets/stake/badge.png" alt="" />
    </div>
    <div class="title">
      <div class="text">{{ title }}</div>
      <img src="../../assets/stake/divider.png" alt="" />
    </div>
    <div
      class="back_btn"
      @click="
        () =>
          $router.push({
            name: 'home',
          })
      "
    >
      <img src="../../assets/stake/back.png" alt="" />
      <div class="text">主页</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  props: ["title"],
  name: "bottom_bar",
  setup() {
    const data = reactive({});
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.bottom {
  position: absolute;
  left: 50%;
  bottom: 5%;
  width: 100%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  .badge_icon {
    transform: translateX(40%);
    img {
      height: 6rem;
    }
  }
  .title {
    place-self: flex-end;
    text-align: left;
    width: 80%;
    font-size: 1.5rem;
    .text {
      width: 100%;
      padding-left: 4rem;
      box-sizing: border-box;
    }
    img {
      width: 100%;
    }
  }
  .back_btn {
    &:hover {
      opacity: 0.8;
    }
    cursor: pointer;
    position: relative;
    width: 6rem;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      color: white;
    }
  }
}
</style>