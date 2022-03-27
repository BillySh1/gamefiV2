<template>
  <div class="container">
    <div class="content">
      <img
        class="bg_badge"
        src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/bg_badge.svg"
        alt=""
      />

      <div class="empty">请先连接钱包</div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, computed } from "vue";
export default {
  name: "connect",
  components: {},
  setup() {
    const data = reactive({
      account: "",
    });
    const lottie_options = computed(() => {
      return {
        animationData: require(`../../assets/aridrop/after2.json`),
      };
    });

    const refData = toRefs(data);
    return {
      ...refData,
      lottie_options,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg_badge {
    position: absolute;
    width: 100%;
    z-index: 1;
    bottom: 15%;
    opacity: 0.8;
  }
}
.empty {
  font-size: 2rem;
}
</style>
