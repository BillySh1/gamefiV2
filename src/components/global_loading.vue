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
      manifest: [],
      createjs: null,
      preload: "",
    });
    onBeforeMount(() => {
      data.createjs = createjs || window.createjs;
      readFiles();
      startPreload();
    });

    const loadComplete = () => {
      ctx.emit("finish");
    };
    const startPreload = () => {
      data.preload = new data.createjs.LoadQueue(true);
      const queue = data.preload;
      queue.on("complete", loadComplete);
      queue.loadManifest(data.manifest);
    };
    const readFiles = () => {
      const path = require("path");
      const files = require.context("../assets/", true, /.png$/).keys();
      files.map((i) => {
        const _relativePath = path.join("assets", i);
        const file = require(`../${_relativePath}`);
        data.manifest.push(file);
      });
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