<template>
  <div class="audio_box">
    <audio id="audio" :src="require('../assets/bf_bgm.mp3')"></audio>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
export default {
  name: "Audio",
  setup() {
    const data = reactive({});
    onMounted(() => {
      let oAudio = document.querySelector("audio");
      oAudio.onended = () => {
        oAudio.load();
        oAudio.play();
      };
      document.addEventListener("touchstart", audioAutoPlay);
      audioAutoPlay();
    });
    const audioAutoPlay = () => {
      let oAudio = document.querySelector("audio");
      oAudio.play();
      sessionStorage.setItem("audio", true);
      document.removeEventListener("touchstart", audioAutoPlay);
    };
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
</style>