<template>
  <div class="progress">
    <InjectGoBack :custom="true" v-if="isMobile" @back="close" />
    <div class="logo">
      <img class="logo_img" src="../assets/loading/logo.svg" alt="" />
      <img class="divider" src="../assets/loading/divider.png" alt="" />
      <div class="text">
        {{ progressText }}
      </div>
    </div>

    <div class="version">version {{ version }}</div>
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
      version: "1.2.3 Airdrop beta",
    });
    onBeforeMount(() => {
      data.createjs = createjs || window.createjs;
      readFiles();
      startPreload();
    });
    const progressText = computed(() => {
      if (data.preload.progress) {
        return (
          "Loading...  " +
          Math.floor(data.preload.progress * 100) +
          "%"
        );
      } else {
        return "Loading Error";
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
  background: url(../assets/loading/loadingBg.png) no-repeat;
  background-size: cover;

  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo_img {
      width: 40rem;
    }
    .divider {
      width: 60rem;
      margin: 2rem 0;
    }
    .text {
      white-space: nowrap;
      font-size: 2rem;
      color: #C7C775;
      display: flex;
      flex-direction: column;
      align-items: center;
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