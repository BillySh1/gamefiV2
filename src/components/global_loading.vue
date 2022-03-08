<template>
  <div class="progress">
    <img class="logo" src="../assets/common/logo.png" alt="" />
    <div class="text">
      {{ "资源加载中,当前进度: " + Math.floor(preload.progress * 100) + "%" }}
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount } from "vue";
const createjs = window.createjs;
export default {
  name: "global_loading",
  setup(prop, ctx) {
    const data = reactive({
      manifest: [
        require("../assets/all_stars/entry/bg.png"),
        require("../assets/all_stars/entry/btn_bg.png"),
        require("../assets/index/chainIcon/bsc.svg"),
        require("../../public/fonts/FZYanZQKSJF.ttf"),
        require("../assets/store/item/jinjie.png"),
        require("../assets/store/item/type_0_0.png"),
        require("../assets/store/item/lingyu.png"),
        require("../assets/store/item/shengji.png"),
        require("../assets/store/item/text_bg.svg"),
        require("../assets/store/item/type_0_1.png"),
        require("../assets/store/item/type_0_1.png"),
        require("../assets/store/item/type_1_0.png"),
        require("../assets/store/item/type_2_0.png"),
        require("../assets/store/item/type_2_1.png"),
        require("../assets/store/item/type_2_2.png"),
        require("../assets/store/item/up_0.png"),
        require("../assets/store/item/up_1.png"),
        require("../assets/store/item/up_2.png"),
        require("../assets/store/item/up_3.png"),
        require("../assets/store/item/up_4.png"),
        require("../assets/store/item/yuruyi.png"),
        require("../assets/store/store_bg.png"),
        require("../assets/store/type0.png"),
        require("../assets/store/type1.png"),
        require("../assets/store/type2.png"),
      ],
      createjs: null,
      preload: "",
    });
    onBeforeMount(() => {
      data.createjs = createjs || window.createjs;
      startPreload();
    });

    const loadComplete = () => {
      setTimeout(() => {
        ctx.emit("finish");
      }, 1000);
    };
    const startPreload = () => {
      data.preload = new data.createjs.LoadQueue(true);
      const queue = data.preload;
      queue.on("complete", loadComplete);
      queue.loadManifest(data.manifest);
    };

    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.progress {
  position: relative;
  background: black;
  width: 100%;
  height: 100%;

  .logo {
    position: absolute;
    width: 80rem;
    height: auto;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .text {
    white-space: nowrap;
    position: absolute;
    font-size: 2rem;
    top: 60%;
    left: 50%;
    transform: translate(-50%, 0);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>