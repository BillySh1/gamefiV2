<template>
  <div class="progress">
    <InjectGoBack :custom="true" v-if="isMobile" @back="close" />
    <img
      class="badge"
      :src="resolveAssets('/assets/common/hero_sit.png')"
      alt=""
    />
    <img class="logo" :src="resolveAssets('/assets/common/logo.png')" alt="" />
    <div class="text">
      {{ progressText }}
    </div>
    <div class="version">版本号 {{ version }}</div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import InjectGoBack from "../components/inject_go_back.vue";
const createjs = window.createjs;
export default {
  name: "global_loading",
  components: {
    InjectGoBack,
  },
  setup(prop, ctx) {
    const data = reactive({
      manifest: [],
      createjs: null,
      preload: "",
      version: "1.0.8",
    });
    onBeforeMount(() => {
      data.createjs = createjs || window.createjs;
      readFiles();
      startPreload();
    });
    const progressText = computed(() => {
      if (data.preload.progress) {
        return (
          "资源加载中,当前进度: " +
          Math.floor(data.preload.progress * 100) +
          "%"
        );
      } else {
        return "资源加载出错，请检查网络环境并重试";
      }
    });
    const isMobile = computed(() => {
      if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    });
    const close = () => {
      const tp = require("tp-js-sdk");
      tp.close();
    };
    const loadComplete = () => {
      ctx.emit("finish");
    };
    const startPreload = () => {
      data.preload = new data.createjs.LoadQueue(true);
      const queue = data.preload;
      queue.on("complete", loadComplete);
      queue.on("error", (e) => {
        console.error(e);
      });
      queue.loadManifest(data.manifest);
    };
    const readFiles = () => {
      const path = require("path");
      const files = require.context("../assets/", true, /\.svg$/).keys();
      const prefix =
        "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/";
      files.map((i) => {
        const _relativePath = path.join("assets", i);
        // const file = require(`../${_relativePath}`);
        const file = prefix + _relativePath;
        data.manifest.push({
          src: file,
          id: _relativePath,
        });
      });
    };

    const refData = toRefs(data);
    return {
      ...refData,
      isMobile,
      progressText,
      close,
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
  .badge {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }

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
  .version {
    position: absolute;
    right: 0%;
    bottom: 5%;
    transform: translateX(-50%);
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>