<template>
  <div class="progress">
    <InjectGoBack :custom="true" v-if="isMobile" @back="close" />
    <div class="p_content">
      <img
        src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/all_stars/entry/loading_logo.png"
      />
      <div class="text">
        {{ progressText }}
      </div>
    </div>

    <div class="version">版本号 {{ version }}</div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import InjectGoBack from "../../components/inject_go_back.vue";
const createjs = window.createjs;
export default {
  name: "bf_loading",
  components: {
    InjectGoBack,
  },
  setup(prop, ctx) {
    const data = reactive({
      manifest: [],
      createjs: null,
      preload: "",
      version: "群英会战 1.0.1 封测",
    });
    onBeforeMount(() => {
      data.createjs = createjs || window.createjs;
    });
    const startLoading = () => {
      readFiles();
      startPreload();
    };
    const progressText = computed(() => {
      if (data.preload.progress) {
        return (
          "资源加载中,当前进度: " +
          Math.floor(data.preload.progress * 100) +
          "%"
        );
      } else if (isNaN(data.preload.progress)) {
        return "资源加载出错，请检查网络环境并重试";
      } else {
        return "资源加载中";
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
      const files = require.context("../../allstar_assets/", true).keys();
      files.map((i) => {
        const _relativePath = path.join("allstar_assets", i);
        const file = require(`../../${_relativePath}`);
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
      startLoading,
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
  .p_content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vmax;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100%;
      margin-bottom: 2rem;
    }
    .text {
      margin-top: 2rem;
      white-space: nowrap;
      font-size: 2rem;
      color: white;
    }
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