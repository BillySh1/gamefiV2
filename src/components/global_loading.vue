<template>
  <div class="progress">
    {{ "资源加载中,当前进度: " + Math.floor(preload.progress * 100) + "%" }}
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount } from "vue";
const createjs = window.createjs;
const fs = require("fs");
const path = require("path");
export default {
  name: "global_loading",
  setup(prop, ctx) {
    const data = reactive({
      manifest: [
        "../assets/all_stars/entry/bg.png",
        "../assets/all_stars/entry/btn_bg.png",
        "../assets/all_stars/entry/divider.png",
        "../assets/all_stars/entry/fire.json",
        "../assets/all_stars/entry/logo.png",
        "../assets/all_stars/entry/mask.png",
        "../assets/all_stars/entry/text.png",
        '../assets/store/item/jinjie.png',
        '../assets/store/item/lingyu.png',
        '../assets/store/item/shengji.png',
        '../assets/store/item/text_bg.svg',
        '../assets/store/item/type_0_0.png',
        '../assets/store/item/type_0_1.png',
        '../assets/store/item/type_1_0.png',
        '../assets/store/item/type_2_0.png',
        '../assets/store/item/type_2_1.png',
        '../assets/store/item/type_2_2.png',
        '../assets/store/item/up_0.png',
        '../assets/store/item/up_2.png',
        '../assets/store/item/up_3.png',
        '../assets/store/item/up_4.png',
        '../assets/store/item/yuruyi.png'
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
    const readAll = (parentPath, out) => {
      try {
        let files = fs.readdirSync(parentPath);
        files.forEach((item) => {
          let tempPath = path.join(parentPath, item);
          let stats = fs.statSync(tempPath);
          if (stats.isDirectory()) {
            readAll(tempPath, out);
          } else {
            out.push(tempPath);
          }
        });
      } catch (e) {
        console.warn("err", parentPath);
        return out;
      }
    };

    const refData = toRefs(data);
    return {
      ...refData,
      readAll,
    };
  },
};
</script>
<style lang='less' scoped>
.progress {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
}
</style>