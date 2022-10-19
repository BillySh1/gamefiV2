<template>
  <div class="hero_avatar_item">
    <img class="avatar" :src="item.avatar" alt="" />
    <div class="hero_name_zone">
      {{ item.name }}
    </div>
    <div class="hero_rarity_zone">
      <img :src="qualityImg" alt="" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted, computed } from "vue";
export default {
  name: "hero_avatar",
  props: ["item"],
  setup(prop) {
    const data = reactive({});
    const qualityImg = computed(() => {
      return [
        require("../../../assets/stake/stake/quality/n.png"),
        require("../../../assets/stake/stake/quality/R.png"),
        require("../../../assets/stake/stake/quality/sr.png"),
        require("../../../assets/stake/stake/quality/ssr.png"),
      ][prop.item.quality];
    });
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
      qualityImg,
    };
  },
};
</script>
<style lang='less' scoped>
.hero_avatar_item {
  position: relative;
  width: 5rem;
  height: 5rem;
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 99px;
  }
  .hero_name_zone {
    position: absolute;
    background: #291707;
    color: #f2dbb9;
    font-size: 1rem;
    padding: 2px 1rem;
    white-space: nowrap;
    bottom: 0;
    right: 0;
    transform: translate(25%, 50%);
  }
  .hero_rarity_zone {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1.5rem;
    transform: translate(-40%,0);
    img {
      height: 100%;
    }
  }
}
</style>