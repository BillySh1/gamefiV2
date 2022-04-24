<template>
  <div class="audio_box">
    <audio id="audio" :src="require('../assets/bf_bgm.mp3')"></audio>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "Audio",
  setup() {
    const data = reactive({});
    onBeforeMount(() => {});
    onMounted(() => {
      let oAudio = document.querySelector("audio");
      oAudio.onended = () => {
        oAudio.load();
        oAudio.play();
      };
      audioAutoPlay();
    });
    const audioAutoPlay = () => {
      let oAudio = document.querySelector("audio");
      oAudio.play();
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